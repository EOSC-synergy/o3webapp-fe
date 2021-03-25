import * as Verifier from './Verifier'
import VerificationError from './VerificationError'

test('checks if year validation works', () => {

    //test if functioning on edge
    expect(Verifier.verifyYear(1970, 2100)).toBe(true);

    //test edges
    expect(() => { Verifier.verifyYear(1959, 2100) } ).toThrow(new VerificationError("Only years from 1960 onwards are supported!"));
    expect(() => { Verifier.verifyYear(1970, 2101) } ).toThrow(new VerificationError("Only years until 2100 are supported!"));

    //test inversed input
    expect(() => { Verifier.verifyYear(2100,1970) } ).toThrow(new VerificationError("The upper year needs to be bigger than the lower!"));

    //not a number as input
    expect(() => { Verifier.verifyYear("hello", 2100) } ).toThrow(new VerificationError('Please enter a valid start year!'))
    expect(() => { Verifier.verifyYear(1970, "hello") } ).toThrow(new VerificationError('Please enter a valid end year!'))
})