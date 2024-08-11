import { Heart, MoonStar, Star, StarHalf, SunIcon } from "lucide-react";
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
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import _ from "lodash";

interface CardProps extends React.ComponentProps<typeof Card> {
  StarNumber: number | null;
  SwitchVal: boolean;
  SetSwitchVal: (val: boolean)=>void;
  isLoading: boolean;
}
function processNumber(number:number) {
  // Obtener la parte entera del número
  const integerPart = Math.floor(number);

  // Verificar si el número es decimal
  const isDecimal = number % 1 !== 0;

  return {
    integerPart,
    isDecimal,
  };
}
export function CardDemo({ className, ...props }: CardProps) {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDark ? "dark" : "light";
    }
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const getInitialIcon = () => {
    return theme === "dark" ? false : true;
  };
  const [isVisible, setIsVisible] = useState(getInitialIcon); //cost for Animation toggle

  useEffect(() => {
    // Save the variable in the local storage
    localStorage.setItem("theme", theme);

    // Aplication of the theme to the body
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    setIsVisible((prevAniState) => (prevAniState === true ? false : true));
  };

  const show = {
    //Const for icon animation
    x: 0,
    y: 0,
    transition: {
      delay: 0.2,
    },
    rotate: [0, 0, -20, 10, 0],
    Repeat: Infinity,
  };

  const hide = {
    //Const for icon animation
    x: -19,
    y: 19,
    transition: {
      delay: 0,
    },
  };
  const result = processNumber(props.StarNumber || 0) 

  return (
    <div className="bg-softG border border-softG br-1 rounded">
      <Card
        className={cn("relative w-[380px] border-softG mx-1 my-1", className)}
        {...props}
      >
        <div className="FoldEffectBack absolute right-0 z-10"></div>
        <div className="FoldEffect absolute right-0 z-30"></div>

        <Button
          className="bg-transparent absolute right-0 z-40 hover:bg-transparent"
          onClick={toggleTheme}
        ></Button>

        <motion.div //Sun animation
          className="absolute right-0 z-20 pt-1 pr-1"
          animate={isVisible ? show : hide}
        >
          <SunIcon color="black" fill="var(--themecolor)" />
        </motion.div>

        <motion.div //Moon Animation
          className="absolute right-0 z-20 pt-1 pr-1"
          animate={isVisible ? hide : show}
        >
          <MoonStar color="black" fill="var(--moon)" />
        </motion.div>

        <CardHeader>
          <CardTitle>
            <div className=" grid grid-cols-3 items-center flex">
              <div className="pl-1 col-span-2">
                Review <span className="text-themecolor-50">Guard</span>{" "}
                <CardDescription>Trust in real reviews!</CardDescription>
              </div>
              <div className=" flex justify-start">
                <Switch className="items-center" checked={props.SwitchVal} onCheckedChange={props.SetSwitchVal}/>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">    
             
          <div className=" flex justify-center items-center space-x-4 ">
            {_.range(0, result.integerPart).map(() => {           
              return <Star
                  color="var(--theme50)"
                  fill="var(--themecolor)"
                />
            })}
            {_.range(result.integerPart,5).map((num) => {           
              return result.isDecimal === true && num===result.integerPart ? (
                <div className="icon-container flex">
                <StarHalf             
                  color="var(--theme50)"
                  fill="var(--themecolor)"  
                  className="absolute"              
                />  
                <StarHalf
                  color="var(--color-StarOutLine)"
                  fill="var(--color-StarFill)"
                  className="scale-x-[-1] inline-block"
                />
                </div>
              ):(
                <Star
                  color="var(--color-StarOutLine)"
                  fill="var(--color-StarFill)"
                />
              );
            })}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" /*onClick={props.OnBtnSpprt}*/>
            <p className="text-softW">Support us </p>
            <Heart
              color="var(--color-softW)"
              fill="var(--color-softW)"
              className="pl-2 mr-2 h-6 w-6"
            />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
