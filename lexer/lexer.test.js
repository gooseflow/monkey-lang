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
            !-/*5;
            5 < 10 > 5;
            if (5 < 10) {
            return true;
            } else {
            return false;
            }
            10 == 10;
            10 != 9;
        `);

        it.each([
            [tokens.LET, "let"],
            [tokens.IDENT, "five"],
            [tokens.ASSIGN, "="],
            [tokens.INT, "5"],
            [tokens.SEMICOLON, ";"],

            [tokens.LET, "let"],
            [tokens.IDENT, "ten"],
            [tokens.ASSIGN, "="],
            [tokens.INT, "10"],
            [tokens.SEMICOLON, ";"],

            [tokens.LET, "let"],
            [tokens.IDENT, "add"],
            [tokens.ASSIGN, "="],
            [tokens.FUNCTION, "fn"],
            [tokens.LPAREN, "("],
            [tokens.IDENT, "x"],
            [tokens.COMMA, ","],
            [tokens.IDENT, "y"],
            [tokens.RPAREN, ")"],
            [tokens.LBRACE, "{"],
            [tokens.IDENT, "x"],
            [tokens.PLUS, "+"],
            [tokens.IDENT, "y"],
            [tokens.SEMICOLON, ";"],
            [tokens.RBRACE, "}"],
            [tokens.SEMICOLON, ";"],

            [tokens.LET, "let"],
            [tokens.IDENT, "result"],
            [tokens.ASSIGN, "="],
            [tokens.IDENT, "add"],
            [tokens.LPAREN, "("],
            [tokens.IDENT, "five"],
            [tokens.COMMA, ","],
            [tokens.IDENT, "ten"],
            [tokens.RPAREN, ")"],
            [tokens.SEMICOLON, ";"],

            [tokens.BANG, "!"],
            [tokens.MINUS, "-"],
            [tokens.SLASH, "/"],
            [tokens.ASTERISK, "*"],
            [tokens.INT, "5"],
            [tokens.SEMICOLON, ";"],

            [tokens.INT, "5"],
            [tokens.LT, "<"],
            [tokens.INT, "10"],
            [tokens.GT, ">"],
            [tokens.INT, "5"],
            [tokens.SEMICOLON, ";"],

            [tokens.IF, "if"],
            [tokens.LPAREN, "("],
            [tokens.INT, "5"],
            [tokens.LT, "<"],
            [tokens.INT, "10"],
            [tokens.RPAREN, ")"],
            [tokens.LBRACE, "{"],
            [tokens.RETURN, "return"],
            [tokens.TRUE, "true"],
            [tokens.SEMICOLON, ";"],
            [tokens.RBRACE, "}"],
            [tokens.ELSE, "else"],
            [tokens.LBRACE, "{"],
            [tokens.RETURN, "return"],
            [tokens.FALSE, "false"],
            [tokens.SEMICOLON, ";"],
            [tokens.RBRACE, "}"],

            [tokens.INT, "10"],
            [tokens.EQ, "=="],
            [tokens.INT, "10"],
            [tokens.SEMICOLON, ";"],

            [tokens.INT, "10"],
            [tokens.NOT_EQ, "!="],
            [tokens.INT, "9"],
            [tokens.SEMICOLON, ";"],

            [tokens.EOF, ""],
        ])("produces correct token %s with literal %s", (expectedType, expectedLiteral) => {
            const tok = lexer.nextToken();

            expect(tok.type).toBe(expectedType);
            expect(tok.literal).toBe(expectedLiteral);
        });
    });
});

