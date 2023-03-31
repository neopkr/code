function createScriptSrc(src, name) {
    let container = document.querySelector(".container");
    let script = document.createElement("script")
    script.classList.add(name)
    if (name.includes(".ts")) {
        script.setAttribute("src", `${src}.ts`)
    } else {
        script.setAttribute('src', src)
    }
    script.setAttribute("type", "module")

    container.parentNode.insertBefore(script, container.nextSibling);
}

function checkIfScriptIsCreated(name) {
    if (document.getElementsByClassName(name).length !== 0) {
        return true;
    }

    return false;
}

function deleteScripts(ext) {
    const scripts = document.getElementsByTagName("script");
    console.log(scripts)
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      const scriptClass = script.getAttribute("class");
      if (scriptClass && scriptClass.includes(ext)) {
        script.parentNode.removeChild(script);
      }
    }
}