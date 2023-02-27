import zero from "../../assets/0.png";
import one from "../../assets/1.png";
import two from "../../assets/2.png";
import three from "../../assets/3.png";
import four from "../../assets/4.png";
import five from "../../assets/5.png";
import six from "../../assets/6.png";
import seven from "../../assets/7.png";
import eight from "../../assets/8.png";
import nine from "../../assets/9.png";
import bomb1 from "../../assets/bomb1.png";
import bomb2 from "../../assets/bomb2.png";
import bomb3 from "../../assets/bomb3.png";
import bomb4 from "../../assets/bomb4.png";
import bomb5 from "../../assets/bomb5.png";
import bomb6 from "../../assets/bomb6.png";
import bomb7 from "../../assets/bomb7.png";
import bomb8 from "../../assets/bomb8.png";
import explode from "../../assets/bombExploded.png";
import bombOpened from "../../assets/bombOpened.png";
import cell from "../../assets/cell.png";
import curious from "../../assets/curious.png";
import emptycell from "../../assets/emptycell.png";
import flag from "../../assets/flag.png";
import loose from "../../assets/loose.png";
import question from "../../assets/question.png";
import questionPressed from "../../assets/questionPressed.png";
import start from "../../assets/start.png";
import startPressed from "../../assets/startPressed.png";
import win from "../../assets/win.png";
import wrong from "../../assets/wrongAssume.png";

const bombCount = [bomb1, bomb2, bomb3, bomb4, bomb5, bomb6, bomb7, bomb8];
const digits = [zero, one, two, three, four, five, six, seven, eight, nine];
const bombs = {wrong, bombOpened, explode};
const smiles = {start, startPressed, curious, loose, win};
const cells = {cell, emptycell, flag, question, questionPressed};

export default {
    bombCount,
    digits,
    bombs,
    smiles,
    cells
}