import {
  Heart,
  Star,
  SunIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import React from "react";
import "./BackgroundCard.css";

interface CardProps extends React.ComponentProps<typeof Card>{
  SwitchVal:boolean;
  OnChange1:(val:boolean)=>void;
  OnBtnTheme:()=>void;
  OnBtnSpprt:()=>void;
}

export function CardDemo({className, ...props }: CardProps) {
  return (
    <Card className={cn("relative w-[380px]", className)} {...props}>
      <div className="FoldEffectBack absolute right-0 z-10"></div>
      <div className="FoldEffect absolute right-0 z-30"></div> 
      <Button className="bg-transparent absolute right-0 z-40 hover:bg-transparent" onClick={props.OnBtnTheme}></Button>
      <SunIcon color="black" fill="#F4F41A" className="bg-transparent absolute right-0 z-20 pt-1 pr-1" />
      <CardHeader>
        <CardTitle>
          <div className=" grid grid-cols-1 sm:grid-cols-3 items-center flex">
            <div className="pl-1 sm:col-span-2">
              Review <span className="text-purple-600">Guard</span>{" "}
              <CardDescription>Trust in real reviews!</CardDescription>
            </div>
            <div className=" flex justify-start"> 
              <Switch className="items-center" checked={props.SwitchVal}/>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex justify-center items-center space-x-4 ">
          <Star color="#bebebeaa" fill="#8f8f8faa" />
          <Star color="#bebebeaa" fill="#8f8f8faa" />
          <Star color="#bebebeaa" fill="#8f8f8faa" />
          <Star color="#bebebeaa" fill="#8f8f8faa" />
          <Star color="#bebebeaa" fill="#8f8f8faa" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={props.OnBtnSpprt}>
          <p>Support us</p>
          <Heart fill="white" className="pl-2 mr-2 h-6 w-6" />
        </Button>
      </CardFooter>
    </Card>
  );
}
