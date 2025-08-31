import React, { useState, useEffect } from "react";
import OriginalLiveCodeBlock from "@theme-original/LiveCodeBlock";
import { TheaterSeatSelect } from "../../../../src/components/TheaterSeatSelect/TheaterSeatSelect";
import { BusSeatSelect } from "../../../../src/components/BusSeatSelect/BusSeatSelect";
import {BusSeatLayoutDesigner} from "../../../../src/components/BusSeatLayoutDesigner/BusSeatLayoutDesigner";
import {TheaterSeatLayoutDesigner} from "../../../../src/components/TheaterSeatLayoutDesigner/TheaterSeatLayoutDesigner";

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
