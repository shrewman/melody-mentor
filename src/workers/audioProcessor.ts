onmessage = (e) => {
  const a = 2;
  console.log('received: ', e.data);
  const result = e.data * 2;
  postMessage(result);
}
