"use client";

import React, { useEffect, useState, useRef } from "react";
import { AlertTriangle, X, CheckCircle, Info, Bug } from "lucide-react";

export type ToastType =
  | "success"
  | "info"
  | "warning"
  | "validation"
  | "auth"
  | "permission"
  | "server"
  | "api"
  | "rateLimit"
  | "notfound"
  | "error";

export type ToastContent = {
  type: ToastType;
  message: string;
  title?: string;
};

type ToastProps = {
  content: ToastContent | null;
  isVisible: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
};

const Toast = ({
  content,
  isVisible,
  onClose = () => {},
  autoClose = true,
  duration = 5000,
}: ToastProps) => {
  const [animation, setAnimation] = useState("idle");

  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const remainingTimeRef = useRef(duration);
  const startTimeRef = useRef<number>(0);

  const handleClose = () => {
    setAnimation("out");
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setTimeout(() => {
      onClose();
      remainingTimeRef.current = duration;
    }, 500);
  };

  const pauseTimer = () => {
    if (autoClose) {
      clearTimeout(timerRef.current!);
      const elapsedTime = Date.now() - startTimeRef.current;
      remainingTimeRef.current -= elapsedTime;
      setIsPaused(true);
    }
  };

  const resumeTimer = () => {
    if (autoClose) {
      startTimeRef.current = Date.now();
      timerRef.current = setTimeout(handleClose, remainingTimeRef.current);
      setIsPaused(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      setAnimation("idle");
      setTimeout(() => setAnimation("in"), 10);

      if (autoClose) {
        startTimeRef.current = Date.now();
        remainingTimeRef.current = duration;
        timerRef.current = setTimeout(handleClose, duration);
      }
    } else {
      setAnimation("idle");
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isVisible, autoClose, duration]);

  const animationClass = {
    in: "animate-slide-right-to-left opacity-100",
    out: "animate-slide-left-to-right opacity-0",
    idle: "translate-x-full opacity-0",
  }[animation];

  if (!isVisible && animation !== "out") return null;
  if (!content) return null;

  const getContentConfig = () => {
    const type = content.type || "info";
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          bgColor: "bg-green-500",
          iconColor: "text-green-600",
          borderColor: "border-green-200",
          bgLight: "bg-green-50",
        };
      case "info":
        return {
          icon: Info,
          bgColor: "bg-blue-500",
          iconColor: "text-blue-600",
          borderColor: "border-blue-200",
          bgLight: "bg-blue-50",
        };
      case "warning":
      case "validation":
        return {
          icon: AlertTriangle,
          bgColor: "bg-yellow-500",
          iconColor: "text-yellow-600",
          borderColor: "border-yellow-200",
          bgLight: "bg-yellow-50",
        };
      case "auth":
      case "server":
      case "api":
      case "error":
        return {
          icon: Bug,
          bgColor: "bg-red-500",
          iconColor: "text-red-600",
          borderColor: "border-red-200",
          bgLight: "bg-red-50",
        };
      case "permission":
      case "rateLimit":
        return {
          icon: AlertTriangle,
          bgColor: "bg-orange-500",
          iconColor: "text-orange-600",
          borderColor: "border-orange-200",
          bgLight: "bg-orange-50",
        };
      case "notfound":
        return {
          icon: Info,
          bgColor: "bg-gray-500",
          iconColor: "text-gray-600",
          borderColor: "border-gray-200",
          bgLight: "bg-gray-50",
        };
      default:
        return {
          icon: Info,
          bgColor: "bg-blue-500",
          iconColor: "text-blue-600",
          borderColor: "border-blue-200",
          bgLight: "bg-blue-50",
        };
    }
  };

  const config = getContentConfig();
  const IconComponent = config.icon;
  const computedTitle =
    content.title ||
    (() => {
      const type = content.type || "info";
      if (type === "success") return "Sucesso";
      if (type === "warning" || type === "validation") return "Aviso";
      if (type === "info" || type === "notfound") return "Informação";
      return "Erro";
    })();

  return (
    <>
      <div className={`fixed top-4 right-4 z-50 max-w-md w-full`}>
        <div
          className={`
            ${config.bgLight} ${config.borderColor} border rounded-xl shadow-lg
            ${animationClass}
          `}
          onMouseEnter={pauseTimer}
          onMouseLeave={resumeTimer}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div
                className={`flex-shrink-0 w-8 h-8 ${config.iconColor} flex items-center justify-center`}
              >
                <IconComponent className="w-5 h-5" />
              </div>

              <div className="ml-3 flex-1">
                {computedTitle && (
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">
                    {computedTitle}
                  </h4>
                )}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {content.message}
                </p>

                {autoClose && (
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                    <div
                      className={`${config.bgColor} h-1 rounded-full`}
                      style={{
                        width: isPaused
                          ? `${(remainingTimeRef.current / duration) * 100}%`
                          : "100%",
                        animation: isPaused
                          ? "none"
                          : `shrink ${remainingTimeRef.current}ms linear forwards`,
                      }}
                    ></div>
                  </div>
                )}
              </div>

              <button
                onClick={handleClose}
                className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
      </div>
    </>
  );
};

export default Toast;
