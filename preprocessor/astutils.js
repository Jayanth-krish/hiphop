/*=====================================================================*/
/*    serrano/prgm/project/hiphop/hiphop/preprocessor/astutils.js      */
/*    -------------------------------------------------------------    */
/*    Author      :  Manuel Serrano                                    */
/*    Creation    :  Tue Jul 17 17:58:05 2018                          */
/*    Last change :  Sun Dec 12 09:50:58 2021 (serrano)                */
/*    Copyright   :  2018-21 Manuel Serrano                            */
/*    -------------------------------------------------------------    */
/*    Utility functions for building the js2scheme AST.                */
/*=====================================================================*/
"use hopscript";

const hopc = require(hop.hopc);
const ast = require(hopc.ast);

let declKey = 10000;
const configUtype = process.versions.hop.naturalCompare("3.5.0") >= 0;

/*---------------------------------------------------------------------*/
/*    J2SNull ...                                                      */
/*---------------------------------------------------------------------*/
function J2SNull(loc) {
   return new ast.J2SNull(loc, 
      Symbol("null") /* type */, 
      null /* hint */, 
      false /* range */);
}

/*---------------------------------------------------------------------*/
/*    J2SUndefined ...                                                 */
/*---------------------------------------------------------------------*/
function J2SUndefined(loc) {
   return new ast.J2SUndefined(loc, 
      Symbol("undefined") /* type */,
      null /* hint */, 
      false /* range */);
}

/*---------------------------------------------------------------------*/
/*    J2SString ...                                                    */
/*---------------------------------------------------------------------*/
function J2SString(loc, str) {
   return new ast.J2SString(loc, 
      Symbol("string") /* type */, 
      null /* hint */,
      false /* range */, 
      str  /* val */,
      null /* escape */,
      false /* private */);
}

/*---------------------------------------------------------------------*/
/*    J2SNumber ...                                                    */
/*---------------------------------------------------------------------*/
function J2SNumber(loc, num) {
   return new ast.J2SNumber(loc, 
      Symbol("unknown") /* type */, 
      null /* hint */,
      false /* range */, 
      num);
}

/*---------------------------------------------------------------------*/
/*    J2SBool ...                                                      */
/*---------------------------------------------------------------------*/
function J2SBool(loc, bool) {
   return new ast.J2SBool(loc, 
      Symbol("bool") /* type */, 
      null /* hint */,
      false /* range */, 
      bool);
}

/*---------------------------------------------------------------------*/
/*    J2SRef ...                                                       */
/*---------------------------------------------------------------------*/
function J2SRef(loc, decl) {
   return new ast.J2SRef(loc, 
      Symbol("any") /* type */, 
      null /* hint */,
      undefined /* range */, 
      decl);
}

/*---------------------------------------------------------------------*/
/*    J2SUnresolvedRef ...                                             */
/*---------------------------------------------------------------------*/
function J2SUnresolvedRef(loc, id) {
   return new ast.J2SUnresolvedRef(loc, 
      Symbol("any") /* type */, 
      null /* hint */,
      undefined /* range */, 
      false /* cache */,
      id);
}

/*---------------------------------------------------------------------*/
/*    J2SHopRef ...                                                    */
/*---------------------------------------------------------------------*/
function J2SHopRef(loc, id) {
   return new ast.J2SHopRef(loc, 
      Symbol("any") /* type */, 
      null /* hint */,
      undefined /* range */, 
      id,
      Symbol("any") /* rtype */, 
      false /* module */);
}

/*---------------------------------------------------------------------*/
/*    J2SThis ...                                                      */
/*---------------------------------------------------------------------*/
function J2SThis(loc, decl) {
   return new ast.J2SThis(loc, 
      Symbol("any") /* type */, 
      null /* hint */,
      undefined /* range */, 
      decl /* decl */);
}

/*---------------------------------------------------------------------*/
/*    J2SAccess ...                                                    */
/*---------------------------------------------------------------------*/
function J2SAccess(loc, obj, field) {
   return new ast.J2SAccess(loc, 
      Symbol("any") /*type */, 
      null /* hint */, 
      false /* range */, 
      obj /* obj */,  
      field /* field */);
}

/*---------------------------------------------------------------------*/
/*    J2SCall ...                                                      */
/*---------------------------------------------------------------------*/
function J2SCall(loc, fun, thisarg, args) {
   return new ast.J2SCall(loc, 
      Symbol("any") /* type */, 
      null /* hint */,
      undefined /* range */, 
      -1 /* profid */,
      fun /* fun */, 
      "direct" /* protocol */,
      thisarg, 
      args);
}

/*---------------------------------------------------------------------*/
/*    J2SObjInit ...                                                   */
/*---------------------------------------------------------------------*/
function J2SObjInit(loc, inits) {
   return new ast.J2SObjInit(loc, 
      Symbol("object") /* type */, 
      null /* hint */,
      undefined /* range */, 
      inits /* inits */, 
      false /* cmap */,
      false /* ronly */);
}

/*---------------------------------------------------------------------*/
/*    J2SDataPropertyInit ...                                          */
/*---------------------------------------------------------------------*/
function J2SDataPropertyInit(loc, name, val) {
   return new ast.J2SDataPropertyInit(loc, 
      name, 
      val);
}

/*---------------------------------------------------------------------*/
/*    J2SPragma ...                                                    */
/*---------------------------------------------------------------------*/
function J2SPragma(loc, lang, vars, vals, expr) {
   return new ast.J2SPragma(loc, 
      Symbol("any") /* type */, 
      null /* hint */,
      undefined /* range */,
      lang, 
      vars, 
      vals, 
      expr);
}

/*---------------------------------------------------------------------*/
/*    J2SFun ...                                                       */
/*---------------------------------------------------------------------*/
function J2SFun(loc, name, params, body) {
   if (configUtype) { 
      return new ast.J2SFun(loc, 
      	 Symbol("unknown") /* type */, 
      	 null /* hint */,
      	 undefined /* range */, 
      	 Symbol("unknown") /* rtype */,
      	 Symbol("unknown") /* rutype */,
      	 undefined /* rrange */, 
      	 "this" /* idthis */,
      	 false /* idgen */, 
      	 "normal" /* mode */,
      	 false /* decl */, 
      	 false /* need_bind_exit_return */,
      	 "no" /* new-target */,
      	 false /* vararg */, 
      	 name /* name */,
      	 false /* generator */, 
      	 true /* optimize */,
      	 false /* thisp */, 
      	 false /* argumentsp */,
      	 params, /* params */
      	 3 /* constrsize */, 
      	 false /* src */,
      	 false /* _method */, 
      	 false /* ismethodof */,
      	 body);
   } else {
      return new ast.J2SFun(loc, 
      	 Symbol("unknown") /* type */, 
      	 null /* hint */,
      	 undefined /* range */, 
      	 Symbol("unknown") /* rtype */,
      	 undefined /* rrange */, 
      	 "this" /* idthis */,
      	 false /* idgen */, 
      	 "normal" /* mode */,
      	 false /* decl */, 
      	 false /* need_bind_exit_return */,
      	 false /* new-target */,
      	 false /* vararg */, 
      	 name /* name */,
      	 false /* generator */, 
      	 true /* optimize */,
      	 false /* thisp */, 
      	 false /* argumentsp */,
      	 params, /* params */
      	 3 /* constrsize */, 
      	 false /* src */,
      	 false /* _method */, 
      	 false /* ismethodof */,
      	 body);
   }
}

/*---------------------------------------------------------------------*/
/*    J2SMethod ...                                                    */
/*---------------------------------------------------------------------*/
function J2SMethod(loc, name, params, body, self) {
   if (configUtype) { 
      return new ast.J2SFun(loc, 
      	 Symbol("unknown") /* type */, 
      	 null /* hint */,
      	 undefined /* range */, 
      	 Symbol("unknown") /* rtype */,
      	 Symbol("unknown") /* rutype */,
      	 undefined /* rrange */, 
      	 "this" /* idthis */,
      	 false /* idgen */, 
      	 "normal" /* mode */,
      	 false /* decl */, 
      	 false /* need_bind_exit_return */,
      	 "no" /* new-target */,
      	 false /* vararg */, 
      	 name /* name */,
      	 false /* generator */, 
      	 true /* optimize */,
      	 self /* thisp */, 
      	 false /* argumentsp */,
      	 params /* params */,
      	 3 /* constrsize */, 
      	 false /* src */,
      	 false /* _method */, 
      	 false /* ismethodof */,
      	 body);
   } else {
      return new ast.J2SFun(loc, 
      	 Symbol("unknown") /* type */, 
      	 null /* hint */,
      	 undefined /* range */, 
      	 Symbol("unknown") /* rtype */,
      	 undefined /* rrange */, 
      	 "this" /* idthis */,
      	 false /* idgen */, 
      	 "normal" /* mode */,
      	 false /* decl */, 
      	 false /* need_bind_exit_return */,
      	 false /* new-target */,
      	 false /* vararg */, 
      	 name /* name */,
      	 false /* generator */, 
      	 true /* optimize */,
      	 self /* thisp */, 
      	 false /* argumentsp */,
      	 params /* params */,
      	 3 /* constrsize */, 
      	 false /* src */,
      	 false /* _method */, 
      	 false /* ismethodof */,
      	 body);
   }
}

/*---------------------------------------------------------------------*/
/*    J2SBlock ...                                                     */
/*---------------------------------------------------------------------*/
function J2SBlock(loc, endloc, nodes) {
   return new ast.J2SBlock(loc, 
      nodes, endloc);
}

/*---------------------------------------------------------------------*/
/*    J2SStmtExpr ...                                                  */
/*---------------------------------------------------------------------*/
function J2SStmtExpr(loc, expr) {
   return new ast.J2SStmtExpr(loc, 
      expr);
}

/*---------------------------------------------------------------------*/
/*    J2SSeq ...                                                       */
/*---------------------------------------------------------------------*/
function J2SSeq(loc, nodes) {
   return new ast.J2SSeq(loc, 
      nodes);
}

/*---------------------------------------------------------------------*/
/*    J2SReturn ...                                                    */
/*---------------------------------------------------------------------*/
function J2SReturn(loc, expr) {
   return new ast.J2SReturn(loc, 
      false /* exit */, 
      true /* tail */,
      undefined /* from */, 
      expr);
}

/*---------------------------------------------------------------------*/
/*    J2SDecl ...                                                      */
/*---------------------------------------------------------------------*/
function J2SDecl(loc, id, binder = "let", _scmid = false) {
   if (configUtype) { 
      return new ast.J2SDecl(loc, 
      	 id /* id */, 
      	 _scmid /* _scmid */, 
      	 declKey++ /* key */,
      	 binder != "const" /* writable */,
      	 "local" /* scope */,
      	 0 /* usecnt */, 
      	 false /* useinloop */,
      	 true /* escape */, 
      	 null /* usage */,
      	 binder == "const" ? "let" : binder /* binder */,
      	 Symbol("any") /* utype */, 
      	 Symbol("any") /* itype */,
      	 Symbol("any") /* vtype */, 
      	 Symbol("any") /* mtype */, 
      	 undefined /* irange */,
      	 undefined /* vrange */, 
      	 null /* hint */,
      	 null /* exports */);
   } else {
      return new ast.J2SDecl(loc, 
      	 id /* id */, 
      	 _scmid /* _scmid */, 
      	 declKey++ /* key */,
      	 binder != "const" /* writable */,
      	 "local" /* scope */,
      	 0 /* usecnt */, 
      	 false /* useinloop */,
      	 true /* escape */, 
      	 null /* usage */,
      	 binder == "const" ? "let" : binder /* binder */,
      	 Symbol("any") /* utype */, 
      	 Symbol("any") /* itype */,
      	 Symbol("any") /* vtype */, 
      	 undefined /* irange */,
      	 undefined /* vrange */, 
      	 null /* hint */,
      	 null /* exports */);
   }
}

/*---------------------------------------------------------------------*/
/*    J2SDeclInitScope ...                                             */
/*---------------------------------------------------------------------*/
function J2SDeclInitScope(loc, id, val, scope, binder = "let") {
   if (configUtype) { 
      return new ast.J2SDeclInit(loc, 
      	 id, 
      	 false /* _scmid */, 
      	 declKey++ /* key */,
      	 true /* writable */, 
      	 scope /* scope */,
      	 0 /* usecnt */, 
      	 false /* useinloop */,
      	 true /* escape */, 
      	 null /* usage */,
      	 binder /* binder */, 
      	 Symbol("any") /* utype */,
      	 Symbol("any") /* itype */, 
      	 Symbol("any") /* vtype */,
      	 Symbol("any") /* mtype */,
      	 undefined /* irange */, 
      	 undefined /* vrange */,
      	 null /* hint */, 
      	 null /* exports */, 
      	 val);
   } else {
      return new ast.J2SDeclInit(loc, 
      	 id, 
      	 false /* _scmid */, 
      	 declKey++ /* key */,
      	 true /* writable */, 
      	 scope /* scope */,
      	 0 /* usecnt */, 
      	 false /* useinloop */,
      	 true /* escape */, 
      	 null /* usage */,
      	 binder /* binder */, 
      	 Symbol("any") /* utype */,
      	 Symbol("any") /* itype */, 
      	 Symbol("any") /* vtype */,
      	 undefined /* irange */, 
      	 undefined /* vrange */,
      	 null /* hint */, 
      	 null /* exports */, 
      	 val);
   }
}

/*---------------------------------------------------------------------*/
/*    J2SDeclInit ...                                                  */
/*---------------------------------------------------------------------*/
function J2SDeclInit(loc, id, val, binder = "let") {
   return J2SDeclInitScope(loc, id, val, "local", binder);
}

/*---------------------------------------------------------------------*/
/*    J2SVarDecls ...                                                  */
/*---------------------------------------------------------------------*/
function J2SVarDecls(loc, decls) {
   return new ast.J2SVarDecls(loc, 
      decls);
}

/*---------------------------------------------------------------------*/
/*    J2SLetBlock ...                                                  */
/*---------------------------------------------------------------------*/
function J2SLetBlock(loc, endloc, decls, nodes, rec = false) {
   return new ast.J2SLetBlock(loc, 
      nodes /* nodes */,
      endloc /* endloc */,
      rec /* rec */,
      decls /* decls */,
      "hopscript" /* mode */);
}

/*---------------------------------------------------------------------*/
/*    J2SArray ...                                                     */
/*---------------------------------------------------------------------*/
function J2SArray(loc, exprs) {
   return new ast.J2SArray(loc, 
      Symbol("array") /* type */, 
      null /* hint */,
      undefined /* range */,
      exprs.length /* len */, 
      exprs);
}

/*---------------------------------------------------------------------*/
/*    J2SAssig ...                                                     */
/*---------------------------------------------------------------------*/
function J2SAssig(loc, lhs, rhs) {
   return new ast.J2SAssig(loc, 
      Symbol("any") /* type */, 
      null /* hint */,
      undefined /* range */,
      lhs, rhs);
}

/*---------------------------------------------------------------------*/
/*    J2SLiteralValue ...                                              */
/*---------------------------------------------------------------------*/
function J2SLiteralValue(loc, val) {
   return new ast.J2SLiteralValue(loc, 
      Symbol("any") /* type */, 
      null /* hint */,
      undefined /* range */,
      val);
}

/*---------------------------------------------------------------------*/
/*    exports                                                          */
/*---------------------------------------------------------------------*/
exports.J2SNull = J2SNull;
exports.J2SUndefined = J2SUndefined;
exports.J2SString = J2SString;
exports.J2SNumber = J2SNumber;
exports.J2SBool = J2SBool;
exports.J2SRef = J2SRef;
exports.J2SUnresolvedRef = J2SUnresolvedRef;
exports.J2SHopRef = J2SHopRef;
exports.J2SThis = J2SThis;
exports.J2SAccess = J2SAccess;
exports.J2SCall = J2SCall;
exports.J2SObjInit = J2SObjInit;
exports.J2SDataPropertyInit = J2SDataPropertyInit;
exports.J2SPragma = J2SPragma;
exports.J2SFun = J2SFun;
exports.J2SMethod = J2SMethod;
exports.J2SReturn = J2SReturn;
exports.J2SBlock = J2SBlock;
exports.J2SLetBlock = J2SLetBlock;
exports.J2SStmtExpr = J2SStmtExpr;
exports.J2SSeq = J2SSeq;
exports.J2SDecl = J2SDecl;
exports.J2SDeclInitScope = J2SDeclInitScope;
exports.J2SDeclInit = J2SDeclInit;
exports.J2SVarDecls = J2SVarDecls;
exports.J2SArray = J2SArray;
exports.J2SAssig = J2SAssig;
exports.J2SLiteralValue = J2SLiteralValue;
