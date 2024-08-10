"use client";

import { useCallback, useEffect } from "react";
import { StatusText, useUpload } from "@/hooks/use-upload";
import {
	CheckCircleIcon,
	CircleArrowDown,
	HammerIcon,
	RocketIcon,
	SaveIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { useToast } from "./ui/use-toast";
import useSubscription from "@/hooks/use-subscription";

export const FileUploader = () => {
	const router = useRouter();
	const { progress, status, fileId, handleUpload } = useUpload();
	const { isOverFileLimit, filesLoading } = useSubscription();
	const { toast } = useToast();

	useEffect(() => {
		if (fileId) {
			router.push(`/dashboard/files/${fileId}`);
		}
	}, [fileId, router]);

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			if (file) {
				if (!isOverFileLimit && !filesLoading) {
					await handleUpload(file);
				} else {
					toast({
						variant: "destructive",
						title: "Free Plan File Limit Reached",
						description:
							"You have reached the maximum number of files allowed for your account. Please upgrade to add more documents.",
					});
				}
			} else {
				toast({
					variant: "destructive",
					title: "Error Uploading File",
					description:
						"There was an error uploading your file. Please try again. If the problem persists, contact support.",
				});
			}
		},
		[handleUpload, toast, isOverFileLimit, filesLoading]
	);

	const statusIcons: {
		[key in StatusText]: JSX.Element;
	} = {
		[StatusText.UPLOADING]: <RocketIcon className="h-20 w-20 text-rose-600" />,
		[StatusText.UPLOADED]: (
			<CheckCircleIcon className="h-20 w-20 text-rose-600" />
		),
		[StatusText.SAVING]: <SaveIcon className="h-20 w-20 text-rose-600" />,
		[StatusText.GENERATING]: (
			<HammerIcon className="h-20 w-20 text-rose-600 animate-bounce" />
		),
	};

	const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
		useDropzone({
			onDrop,
			maxFiles: 1,
			accept: {
				"application/pdf": [".pdf"],
			},
		});

	const uploadInProgress = progress != null && progress >= 0 && progress <= 100;

	return (
		<div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
			{uploadInProgress && (
				<div className="mt-32 flex flex-col justify-center items-center gap-5">
					<div
						className={`radial-progress bg-stone-900 text-rose-500 border-rose-600 border-4 ${
							progress === 100 && "hidden"
						}`}
						role="progressbar"
						style={{
							// @ts-ignore
							"--value": progress,
							"--size": "12rem",
							"--thickness": "1.3rem",
						}}
					>
						{progress} %
					</div>
					{
						// @ts-ignore
						statusIcons[status!]
					}

					{/* @ts-ignore */}
					<p className="text-rose-600 animate-pulse">{status}</p>
				</div>
			)}

			{!uploadInProgress && (
				<div
					{...getRootProps()}
					className={`p-10 border-2 border-dashed mt-10 w-[90%] border-rose-600 text-rose-600 rounded-lg h-96 flex items-center justify-center ${
						isFocused || isDragAccept ? "bg-stone-700" : "bg-stone-900"
					}`}
				>
					<input {...getInputProps()} />

					<div className="flex flex-col items-center justify-center">
						{isDragActive ? (
							<>
								<RocketIcon className="h-20 w-20 animate-ping" />
								<p>Drop the files here ...</p>
							</>
						) : (
							<>
								<CircleArrowDown className="h-20 w-20 animate-bounce" />
								<p>Drag n drop some files here, or click to select files</p>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

