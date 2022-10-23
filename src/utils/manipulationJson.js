export const convertProducts = (data) => {
  const newJson = data.children.reduce((acc1, curr1) => {
    const tempObj = curr1.children.reduce((acc2, curr2) => {
      if (curr2.children.length > 0) {
        const tempObj2 = curr2.children.reduce((acc3, curr3) => {
          acc3[curr3.name] = curr3.value;
          return acc3;
        }, {});
        acc2[curr2.name] = tempObj2;
      } else {
        acc2[curr2.name] = curr2.value;
      }
      return acc2;
    }, {});
    acc1.push(tempObj);
    return acc1;
  }, []);

  const json = {
    products: newJson,
  };

  return json;
};

export const convertProduct = (data) => {
  const newJson = data.children.reduce((acc, curr) => {
    if (curr.children.length > 0) {
      const tempObj = curr.children.reduce((acc2, curr2) => {
        acc2[curr2.name] = curr2.value;
        return acc2;
      }, {});
      acc[curr.name] = tempObj;
    } else {
      acc[curr.name] = curr.value;
    }
    return acc;
  }, {});

  const json = {
    product: newJson,
  };

  return json;
};
