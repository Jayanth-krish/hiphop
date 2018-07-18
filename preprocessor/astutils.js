/*=====================================================================*/
/*    serrano/prgm/project/hiphop/0.2.x/preprocessor/astutils.js       */
/*    -------------------------------------------------------------    */
/*    Author      :  Manuel Serrano                                    */
/*    Creation    :  Tue Jul 17 17:58:05 2018                          */
/*    Last change :  Wed Jul 18 13:52:38 2018 (serrano)                */
/*    Copyright   :  2018 Manuel Serrano                               */
/*    -------------------------------------------------------------    */
/*    Utility functions for building the js2scheme AST.                */
/*=====================================================================*/
"use hopscript";

const hopc = require( hop.hopc );
const ast = require( hopc.ast );

/*---------------------------------------------------------------------*/
/*    J2SNull ...                                                      */
/*---------------------------------------------------------------------*/
function J2SNull( loc ) {
   return new ast.J2SNull( loc, false, false, false,
			   "null" /* type */,
			   null /* hint */, false /* range */ );
}

/*---------------------------------------------------------------------*/
/*    J2SUndefined ...                                                 */
/*---------------------------------------------------------------------*/
function J2SUndefined( loc ) {
   return new ast.J2SUndefined( loc, false, false, false,
				"undefined" /* type */,
				undefined /* hint */, false /* range */ );
}

/*---------------------------------------------------------------------*/
/*    J2SString ...                                                    */
/*---------------------------------------------------------------------*/
function J2SString( loc, str ) {
   return new ast.J2SString( loc, false, false, false,
			     "string" /* type */, null /* hint */,
			     false /* range */, str, null /* escape */ );
}

/*---------------------------------------------------------------------*/
/*    J2SNumber ...                                                    */
/*---------------------------------------------------------------------*/
function J2SNumber( loc, num ) {
   return new ast.J2SNumber( loc, false, false, false,
			     "unknown" /* type */, null /* hint */,
			     false /* range */, num );
}

/*---------------------------------------------------------------------*/
/*    J2SRef ...                                                       */
/*---------------------------------------------------------------------*/
function J2SRef( loc, id ) {
   return new ast.J2SUnresolvedRef( loc, undefined, undefined, undefined,
				    "any", null, undefined, false, id );
}

/*---------------------------------------------------------------------*/
/*    J2SAccess ...                                                    */
/*---------------------------------------------------------------------*/
function J2SAccess( loc, obj, field ) {
   return new ast.J2SAccess( loc, undefined, undefined, undefined,
			     "any" /*type */, null /* hint */,
			     false /* range */, false /* cache */,
			     false /* cspecs */,
			     obj, field );
}

/*---------------------------------------------------------------------*/
/*    J2SCall ...                                                      */
/*---------------------------------------------------------------------*/
function J2SCall( loc, fun, thisarg, args ) {
   return new ast.J2SCall( loc, undefined, undefined, undefined,
			   "any" /* type */, null /* hint */,
			   undefined /* range */, -1 /* profid */,
			   false /* cache */, false /* cspecs */,
			   fun /* fun */, "direct" /* protocol */,
			   thisarg, args );
}

/*---------------------------------------------------------------------*/
/*    J2SObjInit ...                                                   */
/*---------------------------------------------------------------------*/
function J2SObjInit( loc, inits ) {
   return new ast.J2SObjInit( loc, undefined, undefined, undefined,
			      "object" /* type */, null /* hint */,
			      undefined /* range */, inits, false /* cmap */ );
}

/*---------------------------------------------------------------------*/
/*    J2SDataPropertyInit ...                                          */
/*---------------------------------------------------------------------*/
function J2SDataPropertyInit( loc, name, val ) {
   return new ast.J2SDataPropertyInit( loc, undefined, undefined, undefined,
				       name, val );
}

/*---------------------------------------------------------------------*/
/*    J2SPragma ...                                                    */
/*---------------------------------------------------------------------*/
function J2SPragma( loc, lang, vars, vals, expr ) {
   return new ast.J2SPragma( loc, undefined, undefined, undefined,
			     "any" /* type */, null /* hint */,
			     undefined /* range */,
			     lang, vars, vals, expr );
}

/*---------------------------------------------------------------------*/
/*    J2SFun ...                                                       */
/*---------------------------------------------------------------------*/
function J2SFun( loc, params, body ) {
   return new ast.J2SFun( loc, undefined, undefined, undefined,
			  "unknown" /* type */, null /* hint */,
			  undefined /* range */, "unknown" /* rtype */,
			  "this" /* idthis */, false /* idgen */,
			  "normal" /* mode */, false /* decl */,
			  false /* need_bind_exit_return */, false /* vararg */,
			  "" /* name */, false /* generator */,
			  true /* optimize */, false /* thisp */,
			  params, 3 /* constrsize */, false /* src */,
			  false /* _method */, false /* ismethodof */, body );
}

/*---------------------------------------------------------------------*/
/*    J2SBlock ...                                                     */
/*---------------------------------------------------------------------*/
function J2SBlock( loc, endloc, nodes ) {
   return new ast.J2SBlock( loc, undefined, undefined, undefined,
			    nodes, endloc );
}

/*---------------------------------------------------------------------*/
/*    J2SStmtExpr ...                                                  */
/*---------------------------------------------------------------------*/
function J2SStmtExpr( loc, expr ) {
   return new ast.J2SStmtExpr( loc, undefined, undefined, undefined, expr );
}

/*---------------------------------------------------------------------*/
/*    J2SSeq ...                                                       */
/*---------------------------------------------------------------------*/
function J2SSeq( loc, nodes ) {
   return new ast.J2SSeq( loc, undefined, undefined, undefined, nodes );
}

/*---------------------------------------------------------------------*/
/*    J2SReturn ...                                                    */
/*---------------------------------------------------------------------*/
function J2SReturn( loc, expr ) {
   return new ast.J2SReturn( loc, undefined, undefined, undefined,
			     false /* exit */, true /* tail */,
			     undefined /* from */, expr );
}

/*---------------------------------------------------------------------*/
/*    exports                                                          */
/*---------------------------------------------------------------------*/
exports.J2SNull = J2SNull;
exports.J2SUndefined = J2SUndefined;
exports.J2SString = J2SString;
exports.J2SNumber = J2SNumber;
exports.J2SRef = J2SRef;
exports.J2SAccess = J2SAccess;
exports.J2SCall = J2SCall;
exports.J2SObjInit = J2SObjInit;
exports.J2SDataPropertyInit = J2SDataPropertyInit;
exports.J2SPragma = J2SPragma;
exports.J2SFun = J2SFun;
exports.J2SReturn = J2SReturn;
exports.J2SBlock = J2SBlock;
exports.J2SStmtExpr = J2SStmtExpr;
exports.J2SSeq = J2SSeq;