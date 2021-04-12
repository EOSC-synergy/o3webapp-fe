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


test('check if latitude validation works', () => {

    //test if functioning on edge
    expect(Verifier.verifyLatitude(-90, 90)).toBe(true);

    expect(() => { Verifier.verifyLatitude(-91, 90)}).toThrow(new VerificationError("Please enter a valid latitude!"));
    expect(() => { Verifier.verifyLatitude(-90, 91)}).toThrow(new VerificationError("Please enter a valid latitude!"));

    expect(() => { Verifier.verifyLatitude(0, -1)}).toThrow(new VerificationError("Upper Latitude border must be bigger than lower border!"));

    expect(() => { Verifier.verifyLatitude("hello", 90)}).toThrow(new VerificationError('Please enter a valid lower border (format:"lower, upper")'));
    expect(() => { Verifier.verifyLatitude(-90, "hello")}).toThrow(new VerificationError('Please enter a valid upper border (format:"lower, upper")'));


    expect(() => { Verifier.verifyLatitude(null, 90)}).toThrow(new VerificationError('Please enter a valid lower border (format:"lower, upper")'));
    expect(() => { Verifier.verifyLatitude(-90, null)}).toThrow(new VerificationError('Please enter a valid upper border (format:"lower, upper")'));

    expect(() => { Verifier.verifyLatitude(undefined, 90)}).toThrow(new VerificationError('Please enter a valid lower border (format:"lower, upper")'));
    expect(() => { Verifier.verifyLatitude(-90, undefined)}).toThrow(new VerificationError('Please enter a valid upper border (format:"lower, upper")'));

    expect(() => { Verifier.verifyLatitude(null)}).toThrow(new VerificationError('Please enter a valid lower border (format:"lower, upper")'));
})

test('check if months validation works', () => {
    expect(Verifier.verifyMonths([1,12])).toBe(true);

    expect(() => { Verifier.verifyMonths([0,12])}).toThrow(new VerificationError("Only 1 to 12 are valid as values for a month"));
    expect(() => { Verifier.verifyMonths([1,13])}).toThrow(new VerificationError("Only 1 to 12 are valid as values for a month"));
    
    expect(() => { Verifier.verifyMonths([])}).toThrow(new VerificationError("Please enter at least one valid month!"));

    expect(() => { Verifier.verifyMonths(["hello", 1, 12])}).toThrow(new VerificationError("Please enter a valid month"));
    expect(() => { Verifier.verifyMonths([1,2, "hello"])}).toThrow(new VerificationError("Please enter a valid month"));
})
