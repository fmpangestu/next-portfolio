/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconType } from "react-icons";

export interface IService {
  title: string;
  description: string;
  Icon?: IconType;
  image?: any;
}

export interface ISkill {
  title: string;
  level: string;
  Icon?: IconType;
}
