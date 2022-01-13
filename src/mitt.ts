import mitt from "mitt";

type callbackHandle = (data: Record<string, unknown>) => void;

type EventParams = {
    data: string | Record<string, unknown>,
    type?: string,
    callback?: callbackHandle
}

type Events = Record<string, string | EventParams>;

export default mitt<Events>(); // inferred as Emitter<Events>
