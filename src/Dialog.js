import React from "react";
import Button from "@mui/material/Button";
import {
  Autocomplete,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";
import "./Dialog.css";
import { Configuration, OpenAIApi } from "openai";
import GetRandom from "./GetRandom";

export default function Dialog() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  delete configuration.baseOptions.headers["User-Agent"];
  const openai = new OpenAIApi(configuration);
  const [output, setOutput] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [loadPrompt, setLoadPrompt] = React.useState(false);
  const [movieInfo, setMovieInfo] = React.useState({
    title: undefined,
    synopses: undefined,
    image: undefined,
  });
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };
  const handleSend = async () => {
    setLoading(true);
    try {
      const response = await openai.createCompletion({
        model: process.env.REACT_APP_OPENAI_FINE_TUNED_MODEL,
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 150,
      });
      setOutput(response.data.choices[0].text);
    } catch (err) {
      console.log(err);
      setOutput("Error");
    }
    setLoading(false);
  };
  const handleGetRandom = async () => {
    setLoadPrompt(true);
    const rand = await GetRandom();
    if(rand.synopses == '') {
        setPrompt('Something went wrong, try again.')
    }
    setPrompt(rand.synopses);
    setMovieInfo(rand);
    setLoadPrompt(false);
  };

  const handleOnChange = async (newValue) => {
    const option = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "7fbab8e071mshfca073c1cbc94cep138cebjsnfd820d28c285",
        "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
      },
    };
    const url = `https://online-movie-database.p.rapidapi.com/title/get-plots?tconst=${newValue.id}`;
    try {
      let index = 0;
      const response = await fetch(url, option);
      const result = await response.json();
      console.log(result);
      if (result.plots[1]) index = 1;
      setPrompt(result.plots[index].text);
      setMovieInfo({
        title: result.base.title,
        synopses: result.plots[index].text,
        image: result.base.image.url,
      });
      console.log(result.plots[index].text);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const option = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "7fbab8e071mshfca073c1cbc94cep138cebjsnfd820d28c285",
          "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
        },
      };
      const url = `https://online-movie-database.p.rapidapi.com/auto-complete?q=${inputValue}`;
      try {
        const response = await fetch(url, option);
        const result = await response.json();
        const resultFiltered = result.d.filter(function (object, index, self) {
          return (
            index ===
              self.findIndex(function (o) {
                return o.l === object.l;
              }) &&
            "q" in object &&
            object.q === "feature"
          );
        });
        setOptions(resultFiltered);
        console.log(resultFiltered);
      } catch (error) {
        console.error(error);
      }
    };
    if (inputValue !== "") fetchData();
  }, [inputValue]);

  return (
    <div className="Dialog">
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "80%" }}>
          <Autocomplete
            getOptionLabel={(option) => option.l}
            options={options}
            autoComplete
            includeInputInList
            noOptionsText="No movies found"
            onChange={(event, newValue) => {
              handleOnChange(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            isOptionEqualToValue={(option, value) => option.l === value.l}
            renderInput={(params) => (
              <TextField {...params} label="Search" fullWidth />
            )}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={option?.i?.imageUrl}
                  alt=""
                />
                {option.l}
              </Box>
            )}
          />
        </div>
        <div>
            <Button
              variant="contained"
              onClick={handleGetRandom}
              sx={{ width: "170px" }}
            >
              {loadPrompt ? <CircularProgress color="inherit"/> : 'Get Random Movie'}
            </Button>
        </div>
      </div>
      <div className="dialog-input">
        {movieInfo.title !== undefined && (
          <div className="movieInfo">
            {movieInfo.title}
            <img src={movieInfo.image} alt={movieInfo.title} />
          </div>
        )}
        <TextField
          id="outlined-multiline-static"
          fullWidth
          rows={10}
          sx={{
            "& .MuiInputBase-root": {
              color: "white",
            },
            backgroundColor: "#1a2027",
            boxShadow: "rgba(0, 0, 0, 1) 0px 5px 15px",
            borderRadius: "5px",
          }}
          placeholder={"Enter a synopsis..."}
          multiline
          onChange={handlePrompt}
          value={prompt}
        />
      </div>
      <div className="dialog-output">
        {loading ? <CircularProgress /> : output}
      </div>
      <div className="dialog-button">
        <Button variant="contained" onClick={handleSend}>
          Spoil me
        </Button>
      </div>
    </div>
  );
}
