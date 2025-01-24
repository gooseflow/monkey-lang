import { lookupIdent, Token, tokens } from "../token/token.js";

export class Lexer {
    #input
    #position = 0 // curr pos in input (points to curr char)
    #readPosition = 0 // curr reading pos in input (after curr char)
    #ch // curr char under examination

    constructor(input) {
        this.#input = input;
        this.#readChar();
    }

    #readChar() {
        if (this.#readPosition >= this.#input.length) {
            this.#ch = 0;
        } else {
            this.#ch = this.#input[this.#readPosition];
        }

        this.#position = this.#readPosition;
        this.#readPosition += 1;
    }

    #peekChar() {
        if (this.#readPosition >= this.#input.length) {
            return 0;
        } else {
            return this.#input[this.#readPosition];
        }
    }

    nextToken() {
        let tok = {};
        this.#skipWhitespace();

        switch (this.#ch) {
            case "=":
                if (this.#peekChar() === "=") {
                    let ch = this.#ch;
                    this.#readChar();
                    tok = this.#newToken(tokens.EQ, ch + this.#ch);
                } else {
                    tok = this.#newToken(tokens.ASSIGN, this.#ch);
                }
                break;
            case ";":
                tok = this.#newToken(tokens.SEMICOLON, this.#ch);
                break;
            case "(":
                tok = this.#newToken(tokens.LPAREN, this.#ch);
                break;
            case ")":
                tok = this.#newToken(tokens.RPAREN, this.#ch);
                break;
            case ",":
                tok = this.#newToken(tokens.COMMA, this.#ch);
                break;
            case "+":
                tok = this.#newToken(tokens.PLUS, this.#ch);
                break;
            case "-":
                tok = this.#newToken(tokens.MINUS, this.#ch);
                break;
            case "!":
                if (this.#peekChar() === "=") {
                    let ch = this.#ch;
                    this.#readChar();
                    tok = this.#newToken(tokens.NOT_EQ, ch + this.#ch);
                } else {
                    tok = this.#newToken(tokens.BANG, this.#ch);
                }
                break;
            case "*":
                tok = this.#newToken(tokens.ASTERISK, this.#ch);
                break;
            case "/":
                tok = this.#newToken(tokens.SLASH, this.#ch);
                break;
            case "<":
                tok = this.#newToken(tokens.LT, this.#ch);
                break;
            case ">":
                tok = this.#newToken(tokens.GT, this.#ch);
                break;
            case "{":
                tok = this.#newToken(tokens.LBRACE, this.#ch);
                break;
            case "}":
                tok = this.#newToken(tokens.RBRACE, this.#ch);
                break;
            case 0:
                tok = this.#newToken(tokens.EOF, "");
                break;
            default:
                if (this.#isLetter(this.#ch)) {
                    const literal = this.#readIdentifier();
                    return this.#newToken(lookupIdent(literal), literal);
                } else if (this.#isDigit(this.#ch)) {
                    return this.#newToken(tokens.INT, this.#readNumber());
                } else {
                    tok = this.#newToken(tokens.ILLEGAL, this.#ch);
                }
        }

        this.#readChar();
        return tok;
    }

    #newToken(tokenType, ch) {
        return new Token(tokenType, String(ch));
    }

    #isLetter(ch) {
        return "a" <= ch && ch <= "z" || "A" <= ch && ch <= "Z" || ch == "_";
    }

    #readIdentifier() {
        const startPos = this.#position;
        while (this.#isLetter(this.#ch)) {
            this.#readChar();
        }

        return this.#input.slice(startPos, this.#position);
    }

    #skipWhitespace() {
        while (this.#ch === " " || this.#ch === "\t" || this.#ch === "\n" || this.#ch === "\r") {
            this.#readChar();
        }
    }

    #readNumber() {
        const startPos = this.#position;
        while (this.#isDigit(this.#ch)) {
            this.#readChar();
        }

        return this.#input.slice(startPos, this.#position);
    }

    #isDigit(ch) {
        return typeof ch === "string" && ("0" <= ch && ch <= "9");
    }
}

