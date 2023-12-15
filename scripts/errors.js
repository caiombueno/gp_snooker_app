/**
 * Custom error class for indicating that a function is not implemented.
 */
class UnimplementedError extends Error {
    constructor() {
        super('Function not implemented.')
    }
}