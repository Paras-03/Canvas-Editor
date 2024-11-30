import { useState, useRef } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  Select,
  Input,
  Text,
  Flex,
  Center,
  Stack,
  Image,
} from "@chakra-ui/react";

export default function BetterDesign() {
  const canvasRef = useRef(null);
  const [texts, setTexts] = useState([]);
  const [history, setHistory] = useState([]); // Tracks the history of text states for undo/redo
  const [future, setFuture] = useState([]); // Tracks the future state for redo
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Function to save current state to history before a drag starts
  const saveToHistory = () => {
    setHistory([...history, [...texts]]);
    setFuture([]); // Clear future stack on a new change
  };

  const handleAddText = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const canvasRect = canvas.getBoundingClientRect();
      const centerX = canvasRect.width / 2;
      const centerY = canvasRect.height / 2;

      const newText = {
        content: "Add Text",
        x: centerX,
        y: centerY,
        fontSize: 14,
        fontFamily: "Arial",
        fontStyle: "Normal",
      };

      const newTexts = [...texts, newText];
      setTexts(newTexts);
      saveToHistory(); // Save state to history on text addition
    }
  };

  const handleTextChange = (index, newProp) => {
    const updatedTexts = [...texts];
    updatedTexts[index] = { ...updatedTexts[index], ...newProp };
    setTexts(updatedTexts);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const previousState = history.pop();
      setFuture([texts, ...future]);
      setTexts(previousState);
      setHistory([...history]);
    }
  };

  const handleRedo = () => {
    if (future.length > 0) {
      const nextState = future.shift();
      setHistory([...history, texts]);
      setTexts(nextState);
      setFuture([...future]);
    }
  };

  const handleMouseDown = (index, e) => {
    setDragging(true);
    setSelectedTextIndex(index);
    setDragStart({ x: e.clientX, y: e.clientY });
    
    // Save the current state of texts before starting drag
    saveToHistory();
  };

  const handleMouseMove = (e) => {
    if (!dragging || selectedTextIndex === null) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    let newX = texts[selectedTextIndex].x + dx;
    let newY = texts[selectedTextIndex].y + dy;

    // Prevent text from going out of the canvas bounds
    const canvasWidth = canvasRect.width;
    const canvasHeight = canvasRect.height;
    const textWidth = 100; // Estimated width of the text
    const textHeight = 20; // Estimated height of the text

    newX = Math.max(0, Math.min(newX, canvasWidth - textWidth));
    newY = Math.max(0, Math.min(newY, canvasHeight - textHeight));

    // Update the text position
    handleTextChange(selectedTextIndex, { x: newX, y: newY });
    setDragStart({ x: e.clientX, y: e.clientY }); // Update the drag start position for smooth dragging
  };

  const handleMouseUp = () => {
    setDragging(false); // Stop dragging
  };

  return (
    <ChakraProvider>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        {/* Header Section */}
        <Flex justify="space-between" align="center" p={4} bg="#3c91e6" color="white">
          <Image src="https://media.licdn.com/dms/image/v2/D560BAQHJ50fzeZ9Ocw/company-logo_200_200/company-logo_200_200/0/1726065775056/celebrarecompany_logo?e=1741219200&v=beta&t=55LweK6DGmDGPbCBOLb94n4Q8-4fcgg0U_hp97_tPL0" height={75} width={75}/>
          <Flex gap={4}>
            <Button onClick={handleUndo} colorScheme="teal">Undo</Button>
            <Button onClick={handleRedo} colorScheme="teal">Redo</Button>
          </Flex>
        </Flex>

        {/* Canvas Section */}
        <Center flex="1" bg="#e8effc" p={4}>
          <Box
            ref={canvasRef}
            width="60vw"
            height="60vh"
            position="relative"
            border="2px dashed #3c91e6"
            bg="white"
            borderRadius="8px"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Stop dragging when the mouse leaves the canvas
          >
            {texts.map((text, index) => (
              <Box
                key={index}
                position="absolute"
                left={text.x}
                top={text.y}
                fontSize={`${text.fontSize}px`}
                fontFamily={text.fontFamily}
                fontStyle={text.fontStyle}
                padding="4px 8px"
                fontWeight="bold"
                backgroundColor="rgba(60, 145, 230, 0.1)"
                border="1px solid #3c91e6"
                borderRadius="5px"
                cursor="move"
                userSelect="none"
                onMouseDown={(e) => handleMouseDown(index, e)}
              >
                {text.content}
              </Box>
            ))}
          </Box>
        </Center>

        {/* Footer Section */}
        <Box mb={5} mt={3} display="flex" flexDirection="column" alignItems="center">
          {/* Center the Add Text button */}
          <Button
            onClick={handleAddText}
            colorScheme="teal"
            mb={3}
            width={'40%'}
            justifySelf={'center'}
            alignSelf={'center'}
          >
            Add Text
          </Button>

          {/* Edit Text Section */}
          {selectedTextIndex !== null && texts[selectedTextIndex] && (
            <Stack spacing={4} direction="row" justify="center" align="center">
              <Input
                value={texts[selectedTextIndex].content}
                onChange={(e) => handleTextChange(selectedTextIndex, { content: e.target.value })}
                placeholder="Edit text"
                size="sm"
                width="200px" // Optional: adjust width for better layout
              />

              <Select
                value={texts[selectedTextIndex].fontFamily}
                onChange={(e) => handleTextChange(selectedTextIndex, { fontFamily: e.target.value })}
                size="sm"
                width="200px" // Optional: adjust width for better layout
              >
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Times New Roman">Times New Roman</option>
              </Select>

              <Input
                type="number"
                value={texts[selectedTextIndex].fontSize}
                onChange={(e) => handleTextChange(selectedTextIndex, { fontSize: parseInt(e.target.value) })}
                placeholder="Font Size"
                size="sm"
                width="100px" // Optional: adjust width for better layout
              />

              <Select
                value={texts[selectedTextIndex].fontStyle}
                onChange={(e) => handleTextChange(selectedTextIndex, { fontStyle: e.target.value })}
                size="sm"
                width="200px" // Optional: adjust width for better layout
              >
                <option value="Normal">Normal</option>
                <option value="Italic">Italic</option>
                <option value="Bold">Bold</option>
              </Select>
            </Stack>
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
}
