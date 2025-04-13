async function withTimeout(promise, ms, errorMessage = 'Operation timed out') {
    const timeout = new Promise((_, reject) => {
      setTimeout(() => reject(new Error(errorMessage)), ms);
    });
  
    return await Promise.race([promise, timeout]);
}

export { withTimeout };