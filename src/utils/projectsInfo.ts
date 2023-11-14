export function getProjects() {
  const projects: {
    title: string;
    url: string;
    icon: string | undefined;
    image: string;
  }[] = [
    {
      title: "Notes",
      url: "https://notes.monkeydevs.org",
      icon: undefined,
      image: "/fdc.png",
    },
    {
        title: "Enable",
        url: "https://github.com/viktormarinho/enable",
        icon: undefined,
        image: "/simm.png",
      },
  ];
  return projects
}

