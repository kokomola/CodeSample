import { logline } from "@utils/debug";
import { $isOpenned, closeModal, openModal } from "./index";

$isOpenned.on(openModal, () => true).on(closeModal, () => false);


// debug

//$isOpenned.watch(isOpennedOpen => logline('[$modal]', isOpennedOpen));