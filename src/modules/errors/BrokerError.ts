export class BrokerError extends Error {
    codigo: number;
  
    constructor(mensaje: string, codigo: number) {
      super(mensaje);
      this.codigo = codigo;
      Object.setPrototypeOf(this, BrokerError.prototype);
    }
  }