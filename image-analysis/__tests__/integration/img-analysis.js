const { describe, it, expect } = require("@jest/globals");
const aws = require("aws-sdk");
aws.config.update({
  region: "us-east-1",
});
const requestMock = require("./../mocks/request.json");
const { main } = require("./../../src");

describe("Image analyser test suite", () => {
  it("it should analyse successfuly the image returning the results", async () => {
    const finalText = [
      "99.98% de ser do tipo Céu",
      "99.98% de ser do tipo ar livre",
      "99.98% de ser do tipo natureza",
      "99.90% de ser do tipo esfera",
      "99.20% de ser do tipo silhueta",
      "94.61% de ser do tipo pôr do sol",
      "91.13% de ser do tipo iluminação",
      "89.60% de ser do tipo pássaro",
      "89.60% de ser do tipo animal",
      "86.81% de ser do tipo lâmpada",
      "81.57% de ser do tipo pessoa",
    ].join("\n");
    const expected = {
      statusCode: 200,
      body: `A imagem tem \n`.concat(finalText),
    };
    const result = await main(requestMock);
    expect(result).toStrictEqual(expected);
  });
  it("given an empty queryString it should return status code 400", async () => {
    const expected = {
      statusCode: 400,
      body: "an IMG is required",
    };
    const result = await main({ queryStringParameters: {} });
    expect(result).toStrictEqual(expected);
  });
  it("given an invalid imgUrl it should return status code 500", async () => {
    const expected = {
      statusCode: 500,
      body: "Internal Server error",
    };
    const result = await main({ queryStringParameters: {
      imageUrl: 'invalidUrl'
    } });
    expect(result).toStrictEqual(expected);
  });
});
