import assert from 'assert';
import { Parser, Script, ProblemFormatter } from '../src/lib.js';

function parseScript(src) {
    let script = new Script('Anonymous.sx', src);
    let program = new Parser(script).parseProgram();
    for (let problem of script.problems) {
        console.log(' '.repeat(6), (new ProblemFormatter).format(problem));
    }
    return [script, program];
}

describe('Parser', function() {
    it('Should not fail on Select..Case', function() {
        let [script, program] = parseScript(`
            Select Case 5
                Case 0 To 10
                    Print "0-10"
            End Select
        `);
        assert.equal(script.problems.length, 0);
    });
    it('Should fail on inline expressions', function() {
        let [script, program] = parseScript(`
            F a b
        `);
        assert(script.problems.length == 1);
    });
    it('Should parse iterable class', function() {
        let [script, program] = parseScript(`
            Class C
                Operator Iterator
                    For i = 0 To 10
                        Yield i
                    Next
                End Operator
            End Class
        `);
        assert(script.problems.length == 0);
    });
    it('Should parse module asynchronous functions', function() {
        let [script, program] = parseScript(`
            Module App
                Async Function FnA As Double
                    FnA = Await FnB
                End Function

                Function FnB As Promise
                    FnB = New Promise(Function(resolve, reject)
                        resolve 10
                    End Function)
                End Function
            End Module
        `);
        assert(script.problems.length == 0);
    });
    it('Should parse virtual members', function() {
        let [script, program] = parseScript(`
            Class C
                Private _data1 As Double = 0
                Private _data2 As Double = 0

                Property Get Data1 As Double
                    Data1 = _data1
                End Property

                Property Let Data1 (v)
                    _data1 = v
                End Property

                Property Get Data2 (x As Double) As Double
                    Data2 = x + _data2
                End Property

                Property Let Data2 (x As Double, v)
                    _data2 = x + v
                End Property
            End Class
        `);
        assert(script.problems.length == 0);
    });
    it('Should parse enumerations', function() {
        let [script, program] = parseScript(`
            <Flags>
            Enum E
                Member1
                Member2 = 32
                Member3
            End Enum
            Let e As E = CType(Empty, E).Add(Member1, Member2)
            e = Nothing
            e = e.Toggle(Member1)
            Print e.Has(Member1)
            Print e.ValueOf
            ' host-environment dependent String
            ' in debug mode, shows member names, otherwise "E"
            Print e.ToDebugString
        `);
        assert(script.problems.length == 0);
    });
    it('Should parse structure initializer', function() {
        let [script, program] = parseScript(`
            Structure Options
                Public Aliases As Collection?
            End Structure

            O = New Options {
                Aliases = Collection.With("sx", "shock")
            }
            Print O.Aliases?(1)
        `);
        assert(script.problems.length == 0);
    });
});