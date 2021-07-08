export default class Host {
    constructor() {
        this.factory = new HostFactory(this);
        this.sxModule = null;
        this.sxGlobalModule = null;
        this.anyType = null;
        this.emptyType = null;
        this.nothingType = null;
        this.nullType = null;
        this.objectType = null;
        this.callableType = null;
        this.reflectModule = null;
        this.reflectClassType = null;
        this.stringType = null;
        this.integerType = null;
        this.longType = null;
        this.byteType = null;
        this.singleType = null;
        this.doubleType = null;
        this.decimalType = null;
        this.charType = null;
        this.numericTypes = new Set;
        this.integerTypes = new Set;
        this.booleanType = null;
        this.collectionType = null;
        this.byteCollectionType = null;
        this.generatorType = null;
        this.promiseType = null;

        this._rootModules = new Map;
        this._typeInstantiations = new Map;
        this._nullableTypes = new Map;
        this._tupleTypes = [[]];
    }

    init() {
        this.sxModule = this.factory.createModule('ShockScript');
        this.setRootModule('ShockScript', this.sxModule);
        this.sxGlobalModule = this.factory.createModule('Global');
        this.sxModule.define('Global', this.sxGlobalModule);
        this.anyType = this.factory.createAnyType();
        this.emptyType = this.factory.createEmptyType();
        this.nothingType = this.factory.createNothingType();
        this.nullType = this.factory.createNullType();
        this.objectType = this._declareGlobalClass('Object', false);
        this.callableType = this._declareGlobalClass('Callable');

        this.sxGlobalModule.define('Any', this.anyType);
    }

    _declareGlobalClass(name, notInheritable = true) {
        let sym = this.factory.createClass(name, (notInheritable ? ClassFlags.NOT_INHERITABLE : 0));
        if (name.toLowerCase() != 'object') {
            sym.superType = this.objectType;
        }
        this.sxGlobalModule.define(name, sym);
        return sym;
    }

    getRootModule(name) {
        return this._rootModules.get(name.toLowerCase());
    }
    hasRootModule(name) {
        return this._rootModules.has(name.toLowerCase());
    }
    setRootModule(name, symbol) {
        this._rootModules.set(name.toLowerCase(), symbol);
    }
    get rootModules() {
        let r = [];
        for (let [_, symbol] of this._rootModules) {
            r.push(symbol);
        }
        return r;
    }
}

export class HostFactory {
    constructor(host) {
        this._host = host;
    }
}