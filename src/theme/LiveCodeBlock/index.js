import React, { useState, useEffect } from "react";
import OriginalLiveCodeBlock from "@theme-original/LiveCodeBlock";
import { TheaterSeatSelect, TheaterSeatLayoutDesigner, BusSeatSelect, BusSeatLayoutDesigner } from "react-seat-select";

export default function LiveCodeBlock(props) {
  return (
    <OriginalLiveCodeBlock
      {...props}
      scope={{
        React,
        useState,
        useEffect,
        TheaterSeatSelect, // 👈 now available inside ```tsx live
        BusSeatSelect, // 👈 now available inside ```tsx live
        BusSeatLayoutDesigner, // 👈 now available inside ```tsx live
        TheaterSeatLayoutDesigner, // 👈 now available inside ```tsx live
        ...props.scope,
      }}
    />
  );
}
