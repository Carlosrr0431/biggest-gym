import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useAppContext } from "../(context)/AppWrapper";

let animationController;

export const RadioSpectreCelular = ({ url }) => {
  const { inputEl } = useAppContext();
  const canvasRef = useRef();
  const audioRef = inputEl;
  const source = useRef();
  const analyzer = useRef();

  const handledAudioPause = (e) => {
    if (e) {
      let audioContext = new AudioContext();

      if (!source.current) {
        source.current = audioContext.createMediaElementSource(
          audioRef.current
        );
        analyzer.current = audioContext.createAnalyser();
        source.current.connect(analyzer.current);
        analyzer.current.connect(audioContext.destination);
      }

      if (e.type == "pause") {
        return cancelAnimationFrame(animationController);
      }
    }
  };

  const handleAudioPlay = (e) => {
    if (e) {
      let audioContext = new AudioContext();

      if (!source.current) {
        source.current = audioContext.createMediaElementSource(
          audioRef.current
        );
        analyzer.current = audioContext.createAnalyser();
        source.current.connect(analyzer.current);
        analyzer.current.connect(audioContext.destination);
      }
      visualizeData();
    }
  };

  const visualizeData = () => {
    animationController = window.requestAnimationFrame(visualizeData);

    const songData = new Uint8Array(140);
    analyzer.current.getByteFrequencyData(songData);
    const bar_width = 3;
    let start = 0;
    const ctx = canvasRef?.current?.getContext("2d");
    ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    for (let i = 0; i < songData.length; i++) {
      start = i * 4;

      let gradient = ctx?.createLinearGradient(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      gradient?.addColorStop(0.2, "#00E5B9");
      gradient?.addColorStop(1, "#005B82");


      if (ctx) {
        ctx.fillStyle = gradient;
        ctx.fillRect(
          start,
          canvasRef.current.height,
          bar_width,
          -songData[i] / 4
        );
      }
    }
  };

  return (
    <div className="">
      <audio
        ref={audioRef}
        onPlay={handleAudioPlay}
        onPause={handledAudioPause}
        src={url}
        crossorigin="anonymous"
      />
      <canvas ref={canvasRef} width={190} height={80} />
    </div>
  );
};
