import { useEffect, useState } from "react";
const use = () => {
  /** @Globals */
  

  interface Comment {
    text: string;
  }

  /*  
  interface Review {
    comment: {
      content: {
        text: string;
      };
    };
  }
  
 interface ReviewData {
    reviews: Review[];
  }*/

  /** @Selectors */

  /** @States */

  const [flags, setflags] = useState({
    isLoading: false,
  });
  const [StarValue, SetStarValue] = useState<number | null>(null); //Stars
  const [SwitchVal, SetSwitchVal] = useState(false); //Switch
  const [objectId, setObjectId] = useState(""); // id

  // const [comments, setComments] = useState([]);

  /** @Functions */

  async function getSentiment(comment: Comment) {
    //Function to call the gemini nano built AI// Method to initialize the gemini nano session (new one, google pls stop)
    const session = await ai.assistant.create();

    if (comment.text === "" || comment.text === " ") {
      return 0;
    }
    // Prompt the model and stream the result:
    const stream = await session.prompt(
      "Based on the feeling of the next comment: " +
        comment.text +
        "(Just Need a Number not text using a format like this 4.5) rate it from 0 to 5 (can use decimals)"
    );
    const match = stream.match(/^\s*(\d+(\.\d+)?)/); //Regex to get only the number due to dumb AI
    if(match?.[0]){
      console.log("-> " + match[0] + " value of : " + comment.text);
    }
    session.destroy();
    
    return match?.[0] ? parseFloat(match?.[0]) : 0.1111;
  }

  async function AvgSentiment(comments: Comment[], limit: number) {
    const results: number[] = [];
    async function processComment(comment: Comment) {
      const sentiment = await getSentiment(comment);
      results.push(sentiment);
    }
    const chunks = Array.from(
      { length: Math.ceil(comments.length / limit) },
      (_, i) => comments.slice(i * limit, i * limit + limit)
    );
    for (const chunk of chunks) {
      await Promise.all(chunk.map(processComment));
    }
    const totalSentiment = results.reduce(
      (acc, sentiment) => acc + sentiment,
      0
    );
    const averageSentiment = totalSentiment / results.length;
    console.log(`Average Sentiment: ${averageSentiment}`);
    SetStarValue(averageSentiment);
  }

  const updateFlags = (newFlags: Partial<typeof flags>) => {
    setflags((prev) => ({
      ...prev,
      ...newFlags,
    }));
  };

  async function fetchReviews(objectId: string): Promise<Comment[] | null> {
    const endpoint = `https://articulo.mercadolibre.com.mx/noindex/catalog/reviews/${objectId}/search?objectId=${objectId}&siteId=MLM&isItem=true&offset=0&limit=30&x-is-webview=false`;
    const endpoint2 = `https://www.mercadolibre.com.mx/noindex/catalog/reviews/${objectId}/search?objectId=${objectId}&siteId=MLM&isItem=false&order=dateCreated&limit=30&x-is-webview=false`;
    console.log("--> " + endpoint, endpoint2);
    try {
      const response = await fetch(endpoint);
      const response2 = await fetch(endpoint2);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response2.ok) {
        throw new Error(`HTTP error! status: ${response2.status}`);
      }
      const data = await response.json();
      let comments: Comment[] = data.reviews.map((review: any) => ({
        text: review.comment.content.text,
      }));
      if (comments.length === 0) {
        const data = await response2.json();
        comments = data.reviews.map((review: any) => ({
          text: review.comment.content.text,
        }));
      }
      return comments;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  /** @Effects */

  useEffect(() => {
    const fetchAndSetComments = async () => {
      const fetchedComments = await fetchReviews(objectId);   
      if (fetchedComments) {
        AvgSentiment(fetchedComments, 3);
      }
      console.log("fetched");
    };

    if (objectId !== "") {
      console.log("fetching");
      fetchAndSetComments();
    }
  }, [objectId]);

  useEffect(() => {
    chrome.runtime.sendMessage(
      {
        type: "APPLICATION_RUNNING",
        status: SwitchVal,
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          console.log(response, "Object ID recived");
          setObjectId(response?.ID || "");
        }
      }
    ); //Effect to send switch val to the background scripts
  }, [SwitchVal]);
  //Server Prot
  /*
  useEffect(() => {
    const fetchRandomNumber = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/data");
        const data = await response.json();
        console.log(data);
        SetRandomN(data.randomNumber);
      } catch (error) {
        console.error("Error fetching random number:", error);
      }
    };
    if (SwitchVal) {
      fetchRandomNumber();
    }
    if (!SwitchVal) {
      SetRandomN(null);
    }
  }, [SwitchVal]);/*

  /** @Constants */

  return {
    flags,
    localData: { SwitchVal, StarValue },
    methods: {
      updateFlags,
      SetSwitchVal,
    },
  };
};

export default use;
