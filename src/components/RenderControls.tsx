import { z } from "zod";
import { AlignEnd } from "./AlignEnd";
import { Button } from "./Button";
import { InputContainer } from "./Container";
import { ErrorComp } from "./Error";
import { Input } from "./Input";
import { ProgressBar } from "./ProgressBar";
import { Spacing } from "./Spacing";
import { COMP_NAME, CompositionProps } from "../../types/constants";
import { useServerRendering } from "../helpers/use-server-rendering";

export const RenderControls: React.FC<{
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  inputProps: z.infer<typeof CompositionProps>;
}> = ({ text, setText, inputProps }) => {
  const { renderMedia, state, undo, downloadVideo } = useServerRendering(COMP_NAME, inputProps);

  return (
    <InputContainer>
      {state.status === "init" ||
      state.status === "preparing" ||
      state.status === "error" ? (
        <>
          <Input
            disabled={state.status === "preparing"}
            setText={setText}
            text={text}
          ></Input>
          <Spacing></Spacing>
          <AlignEnd>
            <Button
              disabled={state.status === "preparing"}
              loading={state.status === "preparing"}
              onClick={renderMedia}
            >
              Render video
            </Button>
          </AlignEnd>
          {state.status === "error" ? (
            <ErrorComp message={state.error.message}></ErrorComp>
          ) : null}
        </>
      ) : null}
      {(state.status === "bundling" || 
        state.status === "rendering" || 
        state.status === "finalizing" || 
        state.status === "done") ? (
        <>
          <ProgressBar
            progress={
              state.status === "bundling" ? state.progress :
              state.status === "rendering" ? state.progress :
              state.status === "finalizing" ? state.progress :
              1
            }
          />
          <Spacing></Spacing>
          <AlignEnd>
            {state.status === "done" ? (
              <Button onClick={downloadVideo}>
                Download Video
              </Button>
            ) : null}
            {state.status === "bundling" ? (
              <Button disabled>
                Bundling...
              </Button>
            ) : null}
            {state.status === "rendering" ? (
              <Button disabled>
                Rendering...
              </Button>
            ) : null}
            {state.status === "finalizing" ? (
              <Button disabled>
                Finalizing...
              </Button>
            ) : null}
            <Spacing></Spacing>
            <Button onClick={undo} secondary>
              Start Over
            </Button>
          </AlignEnd>
        </>
      ) : null}
    </InputContainer>
  );
};
