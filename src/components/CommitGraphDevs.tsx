import { getDevs, shuffle, sleep } from "../utils";
import { useEffect, useMemo, useState } from "preact/hooks";

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
    <div class="relative mt-64 w-full flex justify-center animate-fadeIn">
      <div class="flex flex-wrap gap-1 w-[540px] mt-[-136px]">
        {commits.map((commit: any) =>
          commit == "greater" ? (
            <div class="bg-[rgb(38,166,65)] rounded-lg h-16 w-16" />
          ) : commit == "great" ? (
            <div class="bg-[rgb(0,109,50)] rounded-lg h-16 w-16" />
          ) : commit == "good" ? (
            <div class="bg-[rgb(14,68,41)] rounded-lg h-16 w-16" />
          ) : (
            <div class="bg-[#2b2b2b] rounded-lg h-16 w-16" />
          )
        )}
      </div>
      <div class="grid grid-cols-4 grid-rows-4 gap-1 absolute top-0">
        {devs.map((dev) =>
          dev.name == "Monkey" ? (
            <div class="bg-[#2b2b2b] rounded-lg h-16 w-16" />
          ) : (
            <DevCard name={dev.name} image={dev.image} />
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
      class="h-16 w-16 flex items-center justify-center bg-cover rounded-lg hover:scale-150 transition group"
      style={{ backgroundImage: `url(${image})` }}
      alt={name}
    ></a>
  );
}
