# Rules of Ludo

**Author**: Luke Yoo &lt;[w.lukeyoo@gmail.com](mailto:w.lukeyoo@gmail.com)&gt;
**Date**: 2025-04-17
**Status**: Draft

## Forwardability

The forwardability is defined by following:

1. If the value of die is more than the number of squares left to a pawn on square
before its Destination, the pawn is **not forwardable**.

2. If the value of die is even and the half is more than the number of squares
   left to a Doubled before its Destination, the Doubled is **not forwardable**.

3. Any other pawn(s) on square or Doubled that are none of the conditions of
   the statement 1 and the statement 2, the pawn or Doubled is **forwardable**.

**Example: _Rule of Six_**

If a player makes six, a first or a second time in its turn, and all player's
pawn(s) on square and Doubled(s) cannot forward since the number of squares
before its Destination is less than six for each pawn on square and the number
of square before its Destination is less than three for each Doubled, and the 
player's Base is  empty, **none** of the players pawn(s) on square and
Doubled(s) is **forwardable**. Therefore, the player takes the third(last) 
roll.

## The Rule of Six

If a player makes a die of six, **a first or a second time** in its turn,
the player has following options:

1. If an idle pawn exists in the player's Base, the player may enter it and
   take another roll.

2. Forward one of the player's forwardable pawn(s) on square by six and take
   another roll.

3. Forward one of the player's forwardable Doubled(s) by three and take 
   another roll.

4. If the player's Base is empty and the player has neither forwardable pawn,
   nor forwardable Doubled, the player takes the third roll(wasted).

If a player makes a die of six, **a third time** in its turn,
the turn is terminated and the next player takes a turn.

## Doubled

**Moves**

If a roll of number **six** is made, in a player's turn, who owns a 
Doubled(Jota), this leads to one of the followings:

1. If the player has at least one pawn in its base, the pawn can enter.
2. The doubled forwards by three squares.

If a roll of **even** number, **other than six**, is made, in a player's turn,
who owns a  Doubled(Jota), the doubled forwards by _N_ squares, where _N_ is
the die number divided by two.

If a roll of **odd** number is made, in a player's turn, who owns a 
Doubled(Jota), this leads to one of the followings:

1. If the player has a pawn on any square, that isn't the part of Doubled,
   the pawn makes move accordingly.

2. Proceed turn to the next player(waste).

**There is no "Trio"**

TODO

## Setback

A setback is determined at an instance of capture by satisfying all of
the following conditions:

1. The target pawn is not on a Safe.

2. The target pawn is not the part of a Doubled(Jota)