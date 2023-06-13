const addFlowbiteScript = () => {
    const script = document.createElement("script");
    script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js";
    script.defer = true;
    document.querySelector("body").appendChild(script);
};

addFlowbiteScript();
