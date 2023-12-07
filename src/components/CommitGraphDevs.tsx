import { useState, useMemo, useEffect } from "react";
import { getDevs, shuffle, sleep } from "../utils";

function commitArray() {
  const greater = Array(16).fill("greater");
  const great = Array(16).fill("great");
  const good = Array(16).fill("good");
  const bad = Array(16).fill("bad");

  return shuffle(greater.concat(great).concat(good).concat(bad));
}

type PropsCardDev = {
  name: string;
  image: string;
};

export default function CommitGraphDevs() {
  const [commits, setCommits] = useState<any>([]);

  const devs = useMemo(() => {
    return shuffle(getDevs());
  }, []);

  const animate = async () => {
    for (const _ of [...Array(3).keys()]) {
      setCommits(commitArray());
      await sleep(500);
    }
  };

  useEffect(() => {
    animate();
  }, []);

  return (
    <div className="relative mt-64 w-full flex justify-center animate-fadeIn">
      <div className="flex flex-wrap gap-1 w-[540px] mt-[-136px]">
        {commits.map((commit: any, index: any) =>
          commit == "greater" ? (
            <div
              key={index}
              className="bg-[rgb(38,166,65)] rounded-lg h-16 w-16"
            />
          ) : commit == "great" ? (
            <div
              key={index}
              className="bg-[rgb(0,109,50)] rounded-lg h-16 w-16"
            />
          ) : commit == "good" ? (
            <div
              key={index}
              className="bg-[rgb(14,68,41)] rounded-lg h-16 w-16"
            />
          ) : (
            <div key={index} className="bg-[#2b2b2b] rounded-lg h-16 w-16" />
          )
        )}
      </div>
      <div className="grid grid-cols-4 grid-rows-4 gap-1 absolute top-0">
        {devs.map((dev, index) =>
          dev.name == "Monkey" ? (
            <div key={index} className="bg-[#2b2b2b] rounded-lg h-16 w-16" />
          ) : (
            <DevCard key={dev.name} name={dev.name} image={dev.image} />
          )
        )}
      </div>
    </div>
  );
}

function DevCard({ image, name }: PropsCardDev) {
  return (
    <a
      href=""
      className="h-16 w-16 flex items-center justify-center bg-cover rounded-lg hover:scale-150 transition group"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-black opacity-0 group-hover:opacity-40 h-full w-full rounded-lg"></div>
    </a>
  );
}
