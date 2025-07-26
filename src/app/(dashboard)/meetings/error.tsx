"use client";
import {  AlertCircleIcon } from "lucide-react";
import React from "react";
import LoadingState from "~/components/LoadingState";

const ErrorPage = () => {
  return <LoadingState title="Error" description="Opps! Please try Again Later" Icon={AlertCircleIcon}/>;
};

export default ErrorPage;
