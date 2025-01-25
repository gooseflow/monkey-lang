import { tokens } from "../token/token.js";

class Node {
    constructor(token) {
        this.token = token;
    }

    tokenLiteral() {
        return this.token ? this.token.literal : "";
    }
}

class Statement {
    constructor(token) {
        this.node = new Node(token);
    }

    statementNode() {
        throw new Error("statementNode() must be implemented.");
    }

    tokenLiteral() {
        return this.node.tokenLiteral();
    }
}

class Expression {
    constructor(token) {
        this.node = new Node(token);
    }

    expressionNode() {
        throw new Error("expressionNode() must be implemented.");
    }

    tokenLiteral() {
        return this.node.tokenLiteral();
    }
}

class LetStatement {
    constructor(name) {
        this.node = new Node(tokens.LET);
        this.name = name;
    }

    statementNode() { }

    tokenLiteral() {
        return this.node.tokenLiteral();
    }
}

class Identifier {
    constructor(value) {
        this.node = new Node(tokens.IDENT);
        this.value = value;
    }

    expressionNode() { }

    tokenLiteral() {
        return this.node.tokenLiteral();
    }
}

class Program {
    #statements;
    constructor() {
        this.#statements = [];
    }

    addStatement(statement) {
        this.#statements.push(statement);
    }

    tokenLiteral() {
        if (this.#statements.length > 0) {
            return this.#statements[0].tokenLiteral();
        }
        return " ";
    }
}

