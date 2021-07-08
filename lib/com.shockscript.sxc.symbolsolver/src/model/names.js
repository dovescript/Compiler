export default class Names {
    constructor() {
        this._typeOrModuleDict = new Map;
        this._notTypeOrModuleDict = new Map;
    }

    *[Symbol.iterator]() {
        for (let [_, symbol] of this._typeOrModuleDict) {
            yield [symbol.name, symbol];
        }
        for (let [_, symbol] of this._notTypeOrModuleDict) {
            yield [symbol.name, symbol];
        }
    }

    get typeOrModuleMap() {
        return new Map(this._typeOrModuleDict);
    }

    get nonTypeOrModuleMap() {
        return new Map(this._notTypeOrModuleDict);
    }

    has(name, typeOrModule = false) {
        return typeOrModule ? this._typeOrModuleDict.has(name.toLowerCase()) : this._notTypeOrModuleDict.has(name.toLowerCase());
    }

    set(name, symbol) {
        if (symbol.isType || symbol.isModule) {
            this._typeOrModuleDict.set(name.toLowerCase(), symbol);
        } else {
            this._notTypeOrModuleDict.set(name.toLowerCase(), symbol);
        }
    }

    resolveName(name, typeOrModule = false) {
        let r = this._map.get(name.toLowerCase());
        if (r == null) {
            return null;
        } else if (typeOrModule) {
            return r.isType || r.isModule ? r : null;
        } else {
            return !r.isType && !r.isModule ? r : null;
        }
    }
}

export class NamesHierarchy {
    constructor(type) {
        this._delegate = type.delegate;
    }

    *[Symbol.iterator]() {
        let d = this._delegate;
        while (d) {
            for (let p of d.names) {
                yield p;
            }
            d = d.inheritsDelegate;
        }
    }
}