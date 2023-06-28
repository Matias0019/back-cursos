export class BrokerError extends Error {
    constructor(mensaje, codigo) {
        super(mensaje);
        this.codigo = codigo;
        Object.setPrototypeOf(this, BrokerError.prototype);
    }
}
//# sourceMappingURL=BrokerError.js.map