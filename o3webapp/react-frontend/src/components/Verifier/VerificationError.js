
class VerificationError extends Error {
    constructor(message) {
        super(message);
        this.name="VerificationError";
    }
}

export default VerificationError;