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
  const [randomNumber, SetRandomN] = useState<number | null>(null); //Stars
  const [SwitchVal, SetSwitchVal] = useState(false); //Switch
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [objectId, setObjectId] = useState("MLM"); // id

  // const [comments, setComments] = useState([]);

  /** @Functions */

  async function getSentiment(comment: Comment,session:any) {                 //Function to call the gemini nano built in AI 
   
    // Prompt the model and stream the result:
    const stream = await session.promptStreaming(
      "Based on the feeling of the next comment: " +
        comment.text +
        "(Just Need a Number not text) rate it from 0 to 5 (can use decimals) and be strict"
    );
    console.log("-> "+stream)
    return parseFloat(stream);
  }

  async function AvgSentiment(comments: Comment[]) {
    const session = await window.ai.createTextSession(); // Method to initialize the gemini nano sesion
    const sentimentPromises = comments.map((comment) => getSentiment(comment,session));
    const sentiments = await Promise.all(sentimentPromises);
    const totalSentiment = sentiments.reduce(
      (acc, sentiment) => acc + sentiment,
      0
    );
    const averageSentiment = totalSentiment / sentiments.length;
    SetRandomN(averageSentiment);
  }

  const updateFlags = (newFlags: Partial<typeof flags>) => {
    setflags((prev) => ({
      ...prev,
      ...newFlags,
    }));
  };

  async function fetchReviews(objectId: string): Promise<Comment[] | null> {
    const endpoint = `https://articulo.mercadolibre.com.mx/noindex/catalog/reviews/MLM3091600092/search?objectId=${objectId}&siteId=MLM&isItem=true&offset=0&limit=30&x-is-webview=false`;
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const comments: Comment[] = data.reviews.map((review: any) => ({
        text: review.comment.content.text,
      }));
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
      setComments(fetchedComments);
    };

    if (objectId) {
      fetchAndSetComments();
      if (comments) {
        comments.forEach((c) => {
          console.log(c.text);
        });
        AvgSentiment(comments);
      }
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
          console.log(response, "Cositas happend");
          setObjectId(response?.ID || "");
        }
      }
    ); //Effect to send switch val to the background scripts
  }, [SwitchVal]);
  //Server Prot
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
  }, [SwitchVal]);

  /** @Constants */

  return {
    flags,
    localData: { SwitchVal, randomNumber, objectId },
    methods: {
      updateFlags,
      SetSwitchVal,
    },
  };
};

export default use;
