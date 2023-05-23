const ValidateEnv = (environment: string | undefined): string => {
    if (!environment || environment.length === 0) {
      throw new Error("Environment is not defined");
    }
  
    return environment;
  };

export default ValidateEnv;