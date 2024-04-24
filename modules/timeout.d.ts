/*=====================================================================*/
/*    serrano/prgm/project/hiphop/hiphop/modules/timeout.d.ts          */
/*    -------------------------------------------------------------    */
/*    Author      :  Manuel Serrano                                    */
/*    Creation    :  Mon Apr  8 09:31:28 2024                          */
/*    Last change :  Mon Apr  8 09:41:11 2024 (serrano)                */
/*    Copyright   :  2024 Manuel Serrano                               */
/*    -------------------------------------------------------------    */
/*    Timeout module type                                              */
/*=====================================================================*/

/*---------------------------------------------------------------------*/
/*    Import                                                           */
/*---------------------------------------------------------------------*/
import type { HipHopFragment } from "../lib/hiphop.d.ts";

/*---------------------------------------------------------------------*/
/*    Export                                                           */
/*---------------------------------------------------------------------*/
export interface Timeout {
   reset: boolean;
   pause: boolean;
   elapsed: number;
}

export const timeout: HipHopFragment;
