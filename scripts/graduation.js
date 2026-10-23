// Graduation page scripts

// Animation GSAP timeline on load event
window.addEventListener("load", () => {
  Swal.fire({
    imageUrl: "./img/4.jpeg",
    imageWidth: 150,
    imageHeight: 190,
    imageAlt: "Revalina Meiyunda mengenakan toga wisuda",
    customClass: {
      image: "graduation-popup-image",
    },
    title: "Putar musik untuk merayakan wisudamu?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Putar Musik",
    cancelButtonText: "Nanti Saja",
  }).then((result) => {
    if (result.isConfirmed) {
      document.querySelector(".song").play();
      animationTimeline();
    } else {
      animationTimeline();
    }
  });
});

const animationTimeline = () => {
  const graduationMessage = document.querySelector(".graduation-message");
  const graduationTitle = document.getElementsByClassName("graduation-title")[0];

  const message = graduationMessage.textContent.replace(/\s+/g, " ").trim();
  const messageFragment = document.createDocumentFragment();

  Array.from(message).forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.textContent = character;
    messageFragment.appendChild(characterSpan);
  });
  graduationMessage.replaceChildren(messageFragment);

  graduationTitle.innerHTML = `<span>${graduationTitle.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewY: "-15deg",
  };

  // animation timeline
  const tl = new TimelineMax();
  const photoTimeline = new TimelineMax({ repeat: -1 });
  const photos = document.querySelectorAll(".rolling-photo");

  photos.forEach((photo, index) => {
    const cardWidth = photo.offsetWidth;
    const cardHeight = photo.offsetHeight;
    const availableX = Math.max(0, window.innerWidth - cardWidth);
    const startX = availableX * (index / Math.max(1, photos.length - 1)) * 0.72;
    const endX = startX + Math.max(100, window.innerWidth * 0.28);
    const curve = Math.sin(index * 1.7) * Math.min(75, window.innerWidth * 0.08);
    const middleX = Math.max(
      startX,
      Math.min(endX, startX + (endX - startX) * 0.5 + curve)
    );
    const middleY = window.innerHeight * (0.3 + (index % 4) * 0.12);
    const firstRotation = -16 + (index % 5) * 7;
    const lastRotation = 12 - (index % 4) * 8;
    const startTime = index * 0.9;

    photoTimeline
      .fromTo(
        photo,
        2.5,
        {
          x: startX,
          y: -cardHeight - 30,
          autoAlpha: 0,
          scale: 0.72 + (index % 3) * 0.08,
          rotation: firstRotation,
          transformOrigin: "center center",
        },
        {
          x: middleX,
          y: middleY,
          autoAlpha: 0.9,
          scale: 1.08,
          rotation: curve < 0 ? -firstRotation / 2 : firstRotation / 2,
          ease: Power1.easeOut,
        },
        startTime
      )
      .to(
        photo,
        2.5,
        {
          x: endX,
          y: window.innerHeight + cardHeight + 30,
          autoAlpha: 0,
          scale: 0.9,
          rotation: lastRotation,
          ease: Power1.easeIn,
        },
        startTime + 2.5
      );
  });

  tl.to(".container", 0.6, {
    visibility: "visible",
  })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10,
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=3.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=3"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0,
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0,
    })
    .from(".graduation-message", 0.9, {
      autoAlpha: 0,
      y: 12,
    })
    .staggerTo(
      ".graduation-message span",
      0.01,
      {
        visibility: "visible",
      },
      0.018
    )
    .to(
      ".fake-btn",
      0.1,
      {
        backgroundColor: "rgb(127, 206, 248)",
      },
      "+=20"
    )
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150,
      },
      "+=1"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.1,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=6")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=4")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
      },
      "+=1.5"
    )
    .to(
      ".idea-5 span",
      0.7,
      {
        rotation: 90,
        x: 8,
      },
      "+=1.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0,
      },
      "+=5"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut,
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut,
      },
      0.2,
      "+=1.5"
    )
    .staggerFromTo(
      ".ballons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400,
      },
      {
        opacity: 1,
        y: -1000,
      },
      0.2
    )
    .from(
      ".profile-picture",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45,
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0,
    })
    .staggerFrom(
      ".graduation-title span",
      0.7,
      {
        opacity: 0,
        y: -50,
        // scale: 0.3,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0.1
    )
    .staggerFromTo(
      ".graduation-title span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150,
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut,
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg",
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4,
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1",
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90,
      },
      "+=1"
    );

};
