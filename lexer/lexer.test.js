import { tokens } from "../token/token.js";
import { Lexer } from "../lexer/lexer.js";

describe("lexer", () => {
    describe("nextToken", () => {
        const lexer = new Lexer(`
            let five = 5;
            let ten = 10;
            let add = fn(x, y) {
                x + y;
            };
            let result = add(five, ten);
            `
        );

        it.each([
            [tokens.LET, 'let'],
            [tokens.IDENT, 'five'],
            [tokens.ASSIGN, '='],
            [tokens.INT, '5'],
            [tokens.SEMICOLON, ';'],

            [tokens.LET, 'let'],
            [tokens.IDENT, 'ten'],
            [tokens.ASSIGN, '='],
            [tokens.INT, '10'],
            [tokens.SEMICOLON, ';'],

            [tokens.LET, 'let'],
            [tokens.IDENT, 'add'],
            [tokens.ASSIGN, '='],
            [tokens.FUNCTION, 'fn'],
            [tokens.LPAREN, '('],
            [tokens.IDENT, 'x'],
            [tokens.COMMA, ','],
            [tokens.IDENT, 'y'],
            [tokens.RPAREN, ')'],
            [tokens.LBRACE, '{'],
            [tokens.IDENT, 'x'],
            [tokens.PLUS, '+'],
            [tokens.IDENT, 'y'],
            [tokens.SEMICOLON, ';'],
            [tokens.RBRACE, '}'],
            [tokens.SEMICOLON, ';'],

            [tokens.LET, 'let'],
            [tokens.IDENT, 'result'],
            [tokens.ASSIGN, '='],
            [tokens.IDENT, 'add'],
            [tokens.LPAREN, '('],
            [tokens.IDENT, 'five'],
            [tokens.COMMA, ','],
            [tokens.IDENT, 'ten'],
            [tokens.RPAREN, ')'],
            [tokens.SEMICOLON, ';'],

            [tokens.EOF, ''],
        ])('produces correct token %s with literal %s', (expectedType, expectedLiteral) => {
            const tok = lexer.nextToken();

            expect(tok.type).toBe(expectedType);
            expect(tok.literal).toBe(expectedLiteral);
        });
    });
});

