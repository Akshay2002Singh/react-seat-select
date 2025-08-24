import React, { useState, useEffect } from "react";
import OriginalLiveCodeBlock from "@theme-original/LiveCodeBlock";
import { TheaterSeatSelect } from "../../../../src/components/TheaterSeatSelect/TheaterSeatSelect";
import { BusSeatSelect } from "../../../../src/components/BusSeatSelect/BusSeatSelect";

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
        ...props.scope,
      }}
    />
  );
}
