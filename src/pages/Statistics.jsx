import React from "react";
// import { ModeToggle } from "../components/mode-toggle";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { needStatisticReport } from "../lib/my-utils";

function Statistics() {
  return (
    <div>
      <div className="mb-5 flex w-full items-center justify-between border-b py-5">
        <h2 className="h2 border-none">Statistics</h2>
      </div>
      <div className="flex gap-5">
        <div>
          <Label htmlFor="type">Turni tanlang</Label>
          <Select id="type">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Bar chart</SelectItem>
              <SelectItem value="pie">Pie chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="type">Mavzuni tanlang</Label>
          <Select id="type">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Mavzuni tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
              {needStatisticReport.map((el) => {
                return <SelectItem value={el}>{el}</SelectItem>;
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
