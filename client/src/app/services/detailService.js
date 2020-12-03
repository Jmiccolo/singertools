export function detailService(){
    let main = document.querySelector("main");
    let container = document.createElement("section");
    let cta = document.createElement("h2");
    cta.innerText = "Let's get Singing!"
    let info = document.createElement("p");
    info.innerText = "A place to record your progress, test your memory, and find new songs to perform!";
    container.append(cta, info);
    main.innerHTML = container.outerHTML;
}