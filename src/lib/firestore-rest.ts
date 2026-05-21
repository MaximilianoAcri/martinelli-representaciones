/**
 * Firestore REST API client
 * Mirrors the firebase-admin/firestore interface so API routes work
 * without a service account key (uses the public API key instead).
 */

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
const API_KEY   = process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;
const DB_BASE   = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// ─── Value converters ─────────────────────────────────────────────────────────

function fromValue(v: any): any {
  if (!v) return null;
  if ("nullValue"      in v) return null;
  if ("booleanValue"   in v) return v.booleanValue;
  if ("integerValue"   in v) return Number(v.integerValue);
  if ("doubleValue"    in v) return v.doubleValue;
  if ("stringValue"    in v) return v.stringValue;
  if ("timestampValue" in v) return v.timestampValue;
  if ("arrayValue"     in v) return (v.arrayValue.values || []).map(fromValue);
  if ("mapValue"       in v) {
    const out: Record<string, any> = {};
    for (const [k, val] of Object.entries(v.mapValue.fields || {})) {
      out[k] = fromValue(val);
    }
    return out;
  }
  return null;
}

function toValue(v: any): any {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === "boolean")        return { booleanValue: v };
  if (typeof v === "number")
    return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (typeof v === "string")         return { stringValue: v };
  if (Array.isArray(v))              return { arrayValue: { values: v.map(toValue) } };
  if (typeof v === "object") {
    const fields: Record<string, any> = {};
    for (const [k, val] of Object.entries(v)) fields[k] = toValue(val);
    return { mapValue: { fields } };
  }
  return { stringValue: String(v) };
}

function docToData(doc: any): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(doc.fields || {})) out[k] = fromValue(v);
  return out;
}

function dataToFields(obj: Record<string, any>): Record<string, any> {
  const fields: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) fields[k] = toValue(v);
  return fields;
}

function idFromName(name: string): string {
  return name.split("/").pop()!;
}

function newId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 20; i++)
    id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

// ─── Where filter builder ─────────────────────────────────────────────────────

const OP_MAP: Record<string, string> = {
  "==": "EQUAL",
  "!=": "NOT_EQUAL",
  "<":  "LESS_THAN",
  "<=": "LESS_THAN_OR_EQUAL",
  ">":  "GREATER_THAN",
  ">=": "GREATER_THAN_OR_EQUAL",
  "in": "IN",
  "not-in": "NOT_IN",
  "array-contains":     "ARRAY_CONTAINS",
  "array-contains-any": "ARRAY_CONTAINS_ANY",
};

function buildFilter(field: string, op: string, value: any): any {
  const firestoreOp = OP_MAP[op] ?? "EQUAL";
  const isArray = ["IN", "NOT_IN", "ARRAY_CONTAINS_ANY"].includes(firestoreOp);
  return {
    fieldFilter: {
      field: { fieldPath: field },
      op: firestoreOp,
      value: isArray
        ? { arrayValue: { values: (value as any[]).map(toValue) } }
        : toValue(value),
    },
  };
}

// ─── DocumentSnapshot ─────────────────────────────────────────────────────────

export class RestDocumentSnapshot {
  id: string;
  exists: boolean;
  ref: RestDocumentReference;
  private _doc: any;

  constructor(doc: any | null, id: string, ref: RestDocumentReference) {
    this._doc   = doc;
    this.id     = id;
    this.ref    = ref;
    this.exists = doc !== null;
  }

  data(): Record<string, any> | undefined {
    return this._doc ? docToData(this._doc) : undefined;
  }
}

// ─── QuerySnapshot ────────────────────────────────────────────────────────────

export class RestQuerySnapshot {
  docs: RestDocumentSnapshot[];
  empty: boolean;

  constructor(docs: RestDocumentSnapshot[]) {
    this.docs  = docs;
    this.empty = docs.length === 0;
  }
}

// ─── DocumentReference ───────────────────────────────────────────────────────

export class RestDocumentReference {
  id: string;
  private col: string;

  constructor(collection: string, id: string) {
    this.col = collection;
    this.id  = id;
  }

  private url(extra = "") {
    return `${DB_BASE}/${this.col}/${this.id}${extra}?key=${API_KEY}`;
  }

  async get(): Promise<RestDocumentSnapshot> {
    const res = await fetch(this.url());
    if (res.status === 404) return new RestDocumentSnapshot(null, this.id, this);
    if (!res.ok) throw new Error(`Firestore GET ${this.col}/${this.id}: ${res.status}`);
    return new RestDocumentSnapshot(await res.json(), this.id, this);
  }

  async set(data: Record<string, any>): Promise<void> {
    const res = await fetch(this.url(), {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ fields: dataToFields(data) }),
    });
    if (!res.ok) throw new Error(`Firestore SET ${this.col}/${this.id}: ${res.status} ${await res.text()}`);
  }

  async update(data: Record<string, any>): Promise<void> {
    const mask = Object.keys(data)
      .map(k => `updateMask.fieldPaths=${encodeURIComponent(k)}`)
      .join("&");
    const res = await fetch(`${DB_BASE}/${this.col}/${this.id}?key=${API_KEY}&${mask}`, {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ fields: dataToFields(data) }),
    });
    if (!res.ok) throw new Error(`Firestore UPDATE ${this.col}/${this.id}: ${res.status} ${await res.text()}`);
  }

  async delete(): Promise<void> {
    const res = await fetch(this.url(), { method: "DELETE" });
    if (!res.ok) throw new Error(`Firestore DELETE ${this.col}/${this.id}: ${res.status}`);
  }
}

// ─── Query ────────────────────────────────────────────────────────────────────

type Constraint =
  | { type: "where";   field: string; op: string; value: any }
  | { type: "orderBy"; field: string; direction: "asc" | "desc" }
  | { type: "limit";   n: number };

export class RestQuery {
  protected col: string;
  protected constraints: Constraint[];

  constructor(col: string, constraints: Constraint[] = []) {
    this.col         = col;
    this.constraints = constraints;
  }

  where(field: string, op: string, value: any): RestQuery {
    return new RestQuery(this.col, [...this.constraints, { type: "where", field, op, value }]);
  }

  orderBy(field: string, direction: "asc" | "desc" = "asc"): RestQuery {
    return new RestQuery(this.col, [...this.constraints, { type: "orderBy", field, direction }]);
  }

  limit(n: number): RestQuery {
    return new RestQuery(this.col, [...this.constraints, { type: "limit", n }]);
  }

  async get(): Promise<RestQuerySnapshot> {
    const wheres   = this.constraints.filter(c => c.type === "where") as Extract<Constraint, { type: "where" }>[];
    const orders   = this.constraints.filter(c => c.type === "orderBy") as Extract<Constraint, { type: "orderBy" }>[];
    const limitVal = (this.constraints.find(c => c.type === "limit") as Extract<Constraint, { type: "limit" }> | undefined)?.n;

    const structured: any = {
      from: [{ collectionId: this.col }],
    };

    if (wheres.length === 1) {
      structured.where = buildFilter(wheres[0].field, wheres[0].op, wheres[0].value);
    } else if (wheres.length > 1) {
      structured.where = {
        compositeFilter: {
          op: "AND",
          filters: wheres.map(w => buildFilter(w.field, w.op, w.value)),
        },
      };
    }

    if (orders.length > 0) {
      structured.orderBy = orders.map(o => ({
        field: { fieldPath: o.field },
        direction: o.direction === "desc" ? "DESCENDING" : "ASCENDING",
      }));
    }

    if (limitVal) structured.limit = limitVal;

    const res = await fetch(`${DB_BASE}:runQuery?key=${API_KEY}`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ structuredQuery: structured }),
    });

    if (!res.ok) throw new Error(`Firestore runQuery ${this.col}: ${res.status} ${await res.text()}`);

    const results: any[] = await res.json();
    const docs = results
      .filter(r => r.document)
      .map(r => {
        const id  = idFromName(r.document.name);
        const ref = new RestDocumentReference(this.col, id);
        return new RestDocumentSnapshot(r.document, id, ref);
      });

    return new RestQuerySnapshot(docs);
  }
}

// ─── CollectionReference ─────────────────────────────────────────────────────

export class RestCollectionReference extends RestQuery {
  constructor(col: string) {
    super(col);
  }

  doc(id?: string): RestDocumentReference {
    return new RestDocumentReference(this.col, id ?? newId());
  }

  async add(data: Record<string, any>): Promise<RestDocumentReference> {
    const res = await fetch(`${DB_BASE}/${this.col}?key=${API_KEY}`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ fields: dataToFields(data) }),
    });
    if (!res.ok) throw new Error(`Firestore ADD ${this.col}: ${res.status} ${await res.text()}`);
    const doc = await res.json();
    return new RestDocumentReference(this.col, idFromName(doc.name));
  }
}

// ─── Root db object ───────────────────────────────────────────────────────────

export const restDb = {
  collection(name: string): RestCollectionReference {
    return new RestCollectionReference(name);
  },
};
