import { blabla } from './exo1.js'
import { test, expectTypeOf, assertType, expect, describe } from 'vitest'

describe('blabla', () => {
    test('3', () => {
        expectTypeOf(blabla).toBeFunction()
        expect(blabla(3)).toBe("Champ")
    })
    test('6', () => {
        expect(blabla(6)).toBe("Champ")
        expect(blabla(10)).toBe("Pau")
        expect(blabla(25)).toBe("Pau")
        expect(blabla(14)).toBe("Lyon")
        expect(blabla(28)).toBe("Lyon")
        expect(blabla(19)).not.toBe("Pau")
    })
})
