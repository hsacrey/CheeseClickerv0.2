import "./styles.css";
import { useState, useEffect } from "react";

//THIS IS THE "APP()" FUNCTION
export default function CheeseClicker() {
  return <Game />;
}

function Game({ startCheese }) {
  //TOTAL: the total amount accumulated from clicks
  const [total, setTotal] = useState(10000);

  //VALUE: value of each button click
  const [value, setValue] = useState(1);
  //CPS: Cheese Per Second, increased through Upgrades
  const [cps, setCps] = useState(0);

  //COST FORMULA: const[costs, setCosts] = useState([INITIAL COSTS])
  const [costs, setCosts] = useState([
    50, //UPGRADE CLICK
    50, //UPGRADE 1 (Conveniently, array position and Upgrade number are the SAME number)
    900, //UPGRADE 2
    9100, //UPGRADE 3
    88000, //UPGRADE 4
    750000, //UPGRADE 5
    6900000, //UPGRADE 6
    46000000, //UPGRADE 7
    577000000, //UPGRADE 8
    8300000000 //UPGRADE 9
  ]);

  //COUNTS: Array that tracks the # of upgrades player has purchased
  const [counts, setCounts] = useState(Array(10).fill(0));

  //FUNCTION FOR HANDLING MAIN CLICK
  function handleMainClick() {
    setTotal(total + value);
  }

  //THIS FUNCTION IS ONLY FOR UPGRADING MAIN CLICK
  function handleUpgradeClick() {
    //If you can afford it, do the upgrade
    if (total - costs[0] >= 0) {
      setValue(value + value); // upgrade doubles the click effectiveness
      setTotal(total - costs[0]); //deduct cost from total
      costs[0] = costs[0] * 3; //cost grows by 3
      counts[0] = counts[0] + 1; //count increment by 1
    }
  }

  //THE UPGRADE NUMBER CORRELATES WITH 'X'
  function handleUpgrade(x) {
    //Skip the upgrade if you can't afford it - saves time + memory
    if (costs[x] > total) {
      return;
    }
    //Copy the arrays
    const nextCosts = costs.slice();
    const nextCounts = counts.slice();

    //If you can afford it, do the upgrade
    if (total - nextCosts[x] >= 0) {
      setTotal(total - nextCosts[x]); //deduct cost from total
      nextCosts[x] = Math.round(nextCosts[x] * 1.15); //cost grows by 15% as whole number
      nextCounts[x]++; //increment count by 1

      // 'X' represents the Upgrade #
      if (x === 1) {
        setCps(cps + 1);
      }
      if (x === 2) {
        setCps(cps + 8);
      }
      if (x === 3) {
        setCps(cps + 47);
      }
      if (x === 4) {
        setCps(cps + 260);
      }
      if (x === 5) {
        setCps(cps + 1400);
      }
      if (x === 6) {
        setCps(cps + 7800);
      }
      if (x === 7) {
        setCps(cps + 44000);
      }
      if (x === 8) {
        setCps(cps + 260000);
      }
      if (x === 9) {
        setCps(cps + 1600000);
      }
    }
    //Replace arrays with new additions
    setCosts(nextCosts);
    setCounts(nextCounts);
  }
  //END of handleUpgrade()

  //THIS IS ACTUALLY ADDING THE CHEESE EACH SECOND BASED ON CPS
  useEffect(() => {
    const interval = setInterval(() => {
      if (cps > 0) {
        setTotal(total + cps / 2);
      }
    }, 500); // Interval is set to 1/2 second to appear faster, cps is divided by 2 to compensate

    return () => clearInterval(interval); // Clears interval to prevent memory leaks.
  }, [total, cps]); // total and cps are the required variables

  return (
    <div className="App">
      {/* ------------- HEADER ------------ */}
      <h1 className="numberDisplay">Venture Capitalist but for Rats</h1>

      {/*-------- DISPLAY TOTAL: CHEESE VAULT -------*/}
      <h2 className="numberDisplay">
        Cheese Vault: {Math.round(total)}{" "}
        {/* the number is rounded to always APPEAR as a whole number */}
        <div> {cps} ch/sec </div>
        {/*--------- MAIN CLICKING BUTTON ---------*/}
        <br />
        <button className="mainClick" onClick={handleMainClick}>
          +{value} CHEESE
        </button>
      </h2>

      {/* ------------- UPGRADE HEADER -------------- */}
      <hr />
      <div className="upHeader">
        <p className="alignLeft">UPGRADES</p>
        <p className="alignRight">COUNT</p>
      </div>
      <br />
      <br />
      <br />
      <hr />
      <div className="upBody">
        {/* ------------- UPGRADES -------------- */}
        {/* UPGRADE MAIN CLICK */}
        <Upgrade
          name="Upgrade Click"
          cost={costs[0]}
          count={counts[0]}
          onClick={handleUpgradeClick}
          desc="Increase the size of your little rat hands!"
        />
        <Upgrade
          name="Rat Friend"
          cost={costs[1]}
          count={counts[1]}
          onClick={() => handleUpgrade(1)}
          desc="Hire a little helper... or ten!"
          cps={counts[1] * 1}
        />
        <Upgrade
          name="Hole in the Wall"
          cost={costs[2]}
          count={counts[2]}
          onClick={() => handleUpgrade(2)}
          desc="Just let yourself in. Simple!"
          cps={counts[2] * 8}
        />
        <Upgrade
          name="Rat Chef"
          cost={costs[3]}
          count={counts[3]}
          onClick={() => handleUpgrade(3)}
          desc={`"Anyone can cook!" - Chef Gusteau`}
          cps={counts[3] * 47}
        />
        <Upgrade
          name="Cheesemonger"
          cost={costs[4]}
          count={counts[4]}
          onClick={() => handleUpgrade(4)}
          desc="Gain expertise in the field!"
          cps={counts[4] * 260}
        />
        <Upgrade
          name="Local Family Farm"
          cost={costs[5]}
          count={counts[5]}
          onClick={() => handleUpgrade(5)}
          desc="The rats tend the land like no other."
          cps={counts[5] * 1400}
        />
        <Upgrade
          name="Tillamook Cheese Factory"
          cost={costs[6]}
          count={counts[6]}
          onClick={() => handleUpgrade(6)}
          desc="Another merger... whose next? Microsoft?"
          cps={counts[6] * 7800}
        />
        <Upgrade
          name="Cheeseosynthesis"
          cost={costs[7]}
          count={counts[7]}
          onClick={() => handleUpgrade(7)}
          desc="Redirect the resources of the entire scientfic community!"
          cps={counts[7] * 44000}
        />
        <Upgrade
          name="Cheese Warfare"
          cost={costs[8]}
          count={counts[8]}
          onClick={() => handleUpgrade(8)}
          desc="It's definitely become an ethical concern, if it wasn't already."
          cps={counts[8] * 260000}
        />
        <Upgrade
          name="Moon Made of Cheese"
          cost={costs[9]}
          count={counts[9]}
          onClick={() => handleUpgrade(9)}
          desc="It has only been seen in legends..."
          cps={counts[9] * 1600000}
        />
      </div>
    </div>
  );
}

function Upgrade({ name, cost, onClick, count, desc, cps }) {
  return (
    <div className="descript">
      <p className="alignLeft">
        <button className="upgrade" onClick={onClick}>
          {name}: {cost.toLocaleString()} ch
        </button>{" "}
        : {desc}
      </p>
      <p className="count"> {count}</p>
    </div>
  );
}
