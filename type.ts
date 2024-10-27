/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconType } from "react-icons";
import { StaticImageData } from "next/image";

export interface IService {
  title: string;
  description: string;
  Icon?: IconType;
  image?: StaticImageData;
}

export interface ISkill {
  title: string;
  level: string;
  Icon?: IconType;
}

export interface IProject {
  title: string;
  description: string;
  image_path: string;
  deployed_url?: string;
  github_url: string;
  category: Category[];
  key_techs: string[];
}
export type Category =
  | "react"
  | "node"
  | "laravel"
  | "nextJs"
  | "express"
  | "php"
  | "mysql"
  | "mongodb"
  | "typescript"
  | "html"
  | "javascript"
  | "css";
