import { tokens } from "../token/token.js";
import { Lexer } from "../lexer/lexer.js";

describe("lexer", () => {
    describe("nextToken", () => {
        const lexer = new Lexer(`=+(){},;`);

        it.each([
            [tokens.ASSIGN, '='],
            [tokens.PLUS, '+'],
            [tokens.LPAREN, '('],
            [tokens.RPAREN, ')'],
            [tokens.LBRACE, '{'],
            [tokens.RBRACE, '}'],
            [tokens.COMMA, ','],
            [tokens.SEMICOLON, ';'],
            [tokens.EOF, ''],
        ])('produces correct token %s with literal %s', (expectedType, expectedLiteral) => {
            const tok = lexer.nextToken();

            expect(tok.type).toBe(expectedType);
            expect(tok.literal).toBe(expectedLiteral);
        });
    });
});

